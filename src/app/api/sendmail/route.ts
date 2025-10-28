import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const {
      // Customer info
      name,
      email,
      phone,
      message,
      subject,
      // Admin/Company info
      adminEmail,
      adminName,
      companyName,
      projectName,
      serviceName,
    } = await request.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Vui lòng điền đầy đủ thông tin bắt buộc" },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Email không hợp lệ" },
        { status: 400 }
      );
    }

    // Validate admin email if provided
    if (adminEmail && !emailRegex.test(adminEmail)) {
      return NextResponse.json(
        { error: "Email admin không hợp lệ" },
        { status: 400 }
      );
    }

    // Set default values for admin info
    const finalAdminEmail =
      adminEmail || process.env.DEFAULT_ADMIN_EMAIL || "contact@landingspa.com";
    const finalAdminName = adminName || "Admin";
    const finalCompanyName = companyName || "LandingSpa";
    const finalServiceName = serviceName || "dịch vụ";
    const finalProjectName = projectName || "";

    // Create nodemailer transporter with PaVietnam SMTP settings
    const transporterConfig = {
      host: process.env.EMAIL_HOST || "mail9057.maychuemail.com",
      port: parseInt(process.env.EMAIL_PORT || "465"),
      secure: true, // Use SSL for port 465
      auth: {
        user: process.env.EMAIL_USER || "contact@landingspa.com",
        pass: process.env.EMAIL_PASS || "Hung4301@",
      },
      // Additional options for better compatibility
      tls: {
        rejectUnauthorized: false,
      },
      debug: true, // Enable debug logging
      logger: true, // Enable logging
    };

    // Alternative config for port 587 STARTTLS (uncomment if 465 doesn't work):
    // const transporterConfig = {
    //   host: process.env.EMAIL_HOST || "mail9057.maychuemail.com",
    //   port: parseInt(process.env.EMAIL_PORT || "587"),
    //   secure: false, // Use STARTTLS
    //   auth: {
    //     user: process.env.EMAIL_USER || "contact@landingspa.com",
    //     pass: process.env.EMAIL_PASS || "Hung4301@",
    //   },
    //   tls: {
    //     rejectUnauthorized: false,
    //   },
    //   requireTLS: true,
    //   debug: true,
    //   logger: true
    // };

    console.log("SMTP Config:", {
      host: transporterConfig.host,
      port: transporterConfig.port,
      secure: transporterConfig.secure,
      user: transporterConfig.auth.user,
    });

    const transporter = nodemailer.createTransport(transporterConfig);

    // Verify connection configuration
    await transporter.verify();

    // Email content for admin notification
    const adminMailOptions = {
      from: `"${finalCompanyName} Contact" <${process.env.EMAIL_USER || "contact@landingspa.com"
        }>`,
      to: finalAdminEmail,
      subject:
        subject ||
        `Liên hệ mới từ ${name}${finalProjectName ? ` - ${finalProjectName}` : ""
        }`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <h2 style="color: #e91e63; text-align: center; margin-bottom: 30px;">
            🌸 Liên hệ mới từ ${finalCompanyName}
          </h2>
          
          ${finalProjectName
          ? `
          <div style="background-color: #e3f2fd; padding: 15px; border-radius: 6px; margin-bottom: 20px; border-left: 4px solid #2196f3;">
            <h3 style="color: #1976d2; margin: 0; font-size: 16px;">📋 Dự án: ${finalProjectName}</h3>
          </div>
          `
          : ""
        }
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
            <h3 style="color: #333; margin-top: 0;">Thông tin khách hàng:</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555; width: 120px;">👤 Họ tên:</td>
                <td style="padding: 8px 0; color: #333;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">📧 Email:</td>
                <td style="padding: 8px 0; color: #333;">${email}</td>
              </tr>
              ${phone
          ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">📞 Điện thoại:</td>
                <td style="padding: 8px 0; color: #333;">${phone}</td>
              </tr>
              `
          : ""
        }
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">🎯 Quan tâm:</td>
                <td style="padding: 8px 0; color: #333;">${finalServiceName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">🕐 Thời gian:</td>
                <td style="padding: 8px 0; color: #333;">${new Date().toLocaleString(
          "vi-VN"
        )}</td>
              </tr>
            </table>
          </div>

          <div style="background-color: #fff; padding: 20px; border: 1px solid #eee; border-radius: 6px;">
            <h3 style="color: #333; margin-top: 0;">💬 Nội dung tin nhắn:</h3>
            <div style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #e91e63; border-radius: 4px;">
              ${message.replace(/\n/g, "<br>")}
            </div>
          </div>

          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #666; font-size: 14px; margin: 0;">
              Email này được gửi tự động từ hệ thống ${finalCompanyName}
            </p>
            <p style="color: #999; font-size: 12px; margin: 5px 0 0 0;">
              Gửi đến: ${finalAdminName} (${finalAdminEmail})
            </p>
          </div>
        </div>
      `,
      text: `
        Liên hệ mới từ ${finalCompanyName}
        ${finalProjectName ? `Dự án: ${finalProjectName}` : ""}
        
        Thông tin khách hàng:
        - Họ tên: ${name}
        - Email: ${email}
        ${phone ? `- Điện thoại: ${phone}` : ""}
        - Quan tâm: ${finalServiceName}
        - Thời gian: ${new Date().toLocaleString("vi-VN")}
        
        Nội dung tin nhắn:
        ${message}
        
        Gửi đến: ${finalAdminName} (${finalAdminEmail})
      `,
    };

    // Auto-reply email for customer
    const customerReplyOptions = {
      from: `"${finalCompanyName}" <${process.env.EMAIL_USER || "contact@landingspa.com"
        }>`,
      to: email,
      subject: `🌸 Cảm ơn bạn đã quan tâm đến ${finalServiceName} của ${finalCompanyName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #e91e63; margin: 0; font-size: 28px;">🌸 ${finalCompanyName}</h1>
            ${finalProjectName
          ? `<p style="color: #666; margin: 5px 0; font-size: 14px; font-weight: bold;">${finalProjectName}</p>`
          : ""
        }
            <p style="color: #666; margin: 10px 0 0 0; font-size: 16px;">Cảm ơn bạn đã quan tâm đến ${finalServiceName}</p>
          </div>

          <div style="background: linear-gradient(135deg, #e91e63, #9c27b0); color: white; padding: 25px; border-radius: 8px; text-align: center; margin-bottom: 25px;">
            <h2 style="margin: 0 0 10px 0; font-size: 24px;">Xin chào ${name}!</h2>
            <p style="margin: 0; font-size: 16px; opacity: 0.9;">Chúng tôi đã nhận được yêu cầu tư vấn của bạn</p>
          </div>

          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 6px; margin-bottom: 25px;">
            <h3 style="color: #333; margin-top: 0; margin-bottom: 15px;">📝 Thông tin bạn đã gửi:</h3>
            <div style="background-color: white; padding: 15px; border-radius: 4px; border-left: 4px solid #e91e63;">
              <p style="margin: 0 0 10px 0; color: #666; font-size: 14px;"><strong>Dịch vụ quan tâm:</strong> ${finalServiceName}</p>
              ${finalProjectName
          ? `<p style="margin: 0 0 10px 0; color: #666; font-size: 14px;"><strong>Dự án:</strong> ${finalProjectName}</p>`
          : ""
        }
              <p style="margin: 0; color: #333; line-height: 1.6;"><strong>Tin nhắn:</strong><br>${message.replace(
          /\n/g,
          "<br>"
        )}</p>
            </div>
          </div>

          <div style="border: 1px solid #e91e63; border-radius: 6px; padding: 20px; margin-bottom: 25px;">
            <h3 style="color: #e91e63; margin-top: 0;">⚡ Cam kết của chúng tôi:</h3>
            <ul style="color: #333; line-height: 1.8; padding-left: 20px;">
              <li>📞 Phản hồi trong vòng <strong>2 giờ</strong> (giờ hành chính)</li>
              <li>🎯 Tư vấn <strong>miễn phí</strong> và chuyên nghiệp</li>
              <li>💝 Ưu đãi đặc biệt cho khách hàng mới</li>
              <li>✨ Dịch vụ chất lượng cao với đội ngũ chuyên nghiệp</li>
            </ul>
          </div>

          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px; text-align: center; margin-bottom: 25px;">
            <h3 style="color: #333; margin-top: 0;">📞 Liên hệ trực tiếp với ${finalAdminName}:</h3>
            <p style="margin: 10px 0; color: #666;">
              📧 ${finalAdminEmail}
            </p>
          </div>

          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #666; font-size: 14px; margin: 0;">
              Cảm ơn bạn đã tin tưởng ${finalCompanyName}! 💕
            </p>
            <p style="color: #999; font-size: 12px; margin: 10px 0 0 0;">
              Email này được gửi tự động, vui lòng không reply.
            </p>
          </div>
        </div>
      `,
      text: `
        Cảm ơn ${name} đã quan tâm đến ${finalServiceName} của ${finalCompanyName}!
        ${finalProjectName ? `Dự án: ${finalProjectName}` : ""}
        
        Chúng tôi đã nhận được tin nhắn của bạn:
        "${message}"
        
        Cam kết của chúng tôi:
        - Phản hồi trong vòng 2 giờ (giờ hành chính)
        - Tư vấn miễn phí và chuyên nghiệp
        - Ưu đãi đặc biệt cho khách hàng mới
        - Dịch vụ chất lượng cao với đội ngũ chuyên nghiệp
        
        Liên hệ trực tiếp với ${finalAdminName}: ${finalAdminEmail}
        
        Cảm ơn bạn đã tin tưởng ${finalCompanyName}!
      `,
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(customerReplyOptions),
    ]);

    return NextResponse.json(
      {
        success: true,
        message:
          "Email đã được gửi thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Email sending error:", error);

    return NextResponse.json(
      {
        error:
          "Có lỗi xảy ra khi gửi email. Vui lòng thử lại sau hoặc liên hệ trực tiếp qua số điện thoại 0978.607.923.",
      },
      { status: 500 }
    );
  }
}

// Handle GET request to show API info
export async function GET() {
  return NextResponse.json({
    message: "Dynamic SendMail API",
    version: "2.0.0",
    endpoints: {
      POST: "/api/sendmail",
      description: "Send contact form email with dynamic admin info",
      customer_fields: {
        required: ["name", "email", "message"],
        optional: ["phone", "subject"],
      },
      admin_fields: {
        optional: [
          "adminEmail",
          "adminName",
          "companyName",
          "projectName",
          "serviceName",
        ],
      },
      example_request: {
        name: "Nguyen Van A",
        email: "customer@example.com",
        phone: "0123456789",
        message: "Tôi muốn tư vấn về dịch vụ...",
        subject: "Yêu cầu tư vấn",
        adminEmail: "admin@company.com",
        adminName: "Mr. Admin",
        companyName: "ABC Company",
        projectName: "Website Spa Project",
        serviceName: "thiết kế website spa",
      },
    },
  });
}
