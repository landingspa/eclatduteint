import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json();

    // Google Apps Script Web App URL
    // Bạn cần tạo Google Apps Script và thay thế URL này
    const GOOGLE_SCRIPT_URL =
      process.env.GOOGLE_SCRIPT_URL ||
      "https://script.google.com/macros/s/AKfycbw6byRx_pnYKa8GuahPgEsi5hwyHzpt3xrlsM3z6hSfYuDpRiq3n7bP59i3g3Pp5qr2Ew/exec";

    if (!GOOGLE_SCRIPT_URL) {
      console.warn("Google Script URL not configured");
      // Không return error để không ảnh hưởng đến flow đặt hàng
      return NextResponse.json(
        {
          success: true,
          message: "Order processed (Google Sheets logging disabled)",
        },
        { status: 200 }
      );
    }

    // Send data to Google Sheets via Apps Script
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error("Failed to save to Google Sheets");
    }

    const result = await response.json();

    return NextResponse.json(
      {
        success: true,
        message: "Order saved to Google Sheets successfully",
        data: result,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving to Google Sheets:", error);

    // Không throw error để không ảnh hưởng đến flow đặt hàng
    return NextResponse.json(
      {
        success: false,
        message: "Failed to save to Google Sheets but order was processed",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 200 } // Vẫn return 200 để không break flow
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Save Order to Google Sheets API",
    version: "1.0.0",
    endpoints: {
      POST: "/api/save-order",
      description: "Save order data to Google Sheets",
      required_fields: [
        "orderNumber",
        "customerName",
        "customerEmail",
        "customerPhone",
        "customerAddress",
        "items",
        "total",
        "orderDate",
      ],
    },
  });
}
