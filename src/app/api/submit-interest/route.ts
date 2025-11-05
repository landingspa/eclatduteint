import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const formData = await request.json();

        // Validate required fields
        if (
            !formData.fullName ||
            !formData.phoneZalo ||
            !formData.spaClinicName ||
            !formData.address
        ) {
            return NextResponse.json(
                { error: "Vui lòng điền đầy đủ thông tin bắt buộc." },
                { status: 400 }
            );
        }

        // Validate at least one checkbox is selected for required fields
        if (
            formData.role.length === 0 ||
            formData.expectations.length === 0 ||
            formData.confirmMethod.length === 0
        ) {
            return NextResponse.json(
                { error: "Vui lòng chọn ít nhất một lựa chọn cho các trường bắt buộc." },
                { status: 400 }
            );
        }

        // Prepare data for Google Sheets
        const timestamp = new Date().toLocaleString("vi-VN", {
            timeZone: "Asia/Ho_Chi_Minh",
        });

        const rowData = [
            timestamp,
            formData.fullName,
            formData.phoneZalo,
            formData.email || "",
            formData.spaClinicName,
            formData.address,
            formData.role.join(", "),
            formData.expectations.join(", "),
            formData.confirmMethod.join(", "),
            formData.notes || "",
        ];

        // Google Sheets Web App URL
        // You need to replace this with your actual Google Apps Script Web App URL
        const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL || "https://script.google.com/macros/s/AKfycbyYwj6ItKJvRx6UuEIJotf7kMZqnEtwxa2y93OTm4xbi20ILTdfDGueR0Sn3UNQJNZx/exec";

        if (!GOOGLE_SCRIPT_URL) {
            console.error("GOOGLE_SCRIPT_URL not configured");
            return NextResponse.json(
                { error: "Cấu hình server chưa hoàn tất. Vui lòng liên hệ quản trị viên." },
                { status: 500 }
            );
        }

        // Send data to Google Sheets
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ data: rowData }),
        });

        if (!response.ok) {
            throw new Error("Failed to submit to Google Sheets");
        }

        return NextResponse.json(
            { success: true, message: "Đăng ký thành công!" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error submitting interest form:", error);
        return NextResponse.json(
            { error: "Có lỗi xảy ra. Vui lòng thử lại sau." },
            { status: 500 }
        );
    }
}
