
exports.handler = async (event, context) => {
  // Handle CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const data = JSON.parse(event.body);
    const { name, phone, message, service } = data;

    // Basic validation
    if (!name || !phone || !message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          error: 'البيانات المطلوبة ناقصة',
          message: 'الرجاء إدخال الاسم ورقم الهاتف والرسالة'
        })
      };
    }

    // Phone number validation (Saudi Arabia format)
    const phoneRegex = /^(\+966|0)?[5][0-9]{8}$/;
    if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          error: 'رقم الهاتف غير صحيح',
          message: 'الرجاء إدخال رقم هاتف سعودي صحيح'
        })
      };
    }

    // Format message for WhatsApp
    const whatsappMessage = `
🚛 *طلب خدمة سطحة هيدروليك جديد*

👤 *الاسم:* ${name}
📱 *الهاتف:* ${phone}
🔧 *نوع الخدمة:* ${service || 'غير محدد'}
💬 *الرسالة:*
${message}

⏰ *وقت الطلب:* ${new Date().toLocaleString('ar-SA', { timeZone: 'Asia/Riyadh' })}
    `.trim();

    // Here you can integrate with:
    // - Email service (SendGrid, Mailgun, etc.)
    // - SMS service (Twilio, etc.)
    // - Database (Airtable, Google Sheets, etc.)
    // - WhatsApp Business API

    // For now, we'll just log and return success
    console.log('New contact form submission:', {
      name,
      phone,
      service,
      message,
      timestamp: new Date().toISOString(),
      whatsappMessage
    });

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'تم إرسال طلبك بنجاح! سنتواصل معك في أقرب وقت ممكن.',
        whatsappUrl: `https://wa.me/966503269219?text=${encodeURIComponent(whatsappMessage)}`
      })
    };

  } catch (error) {
    console.error('Contact form error:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'خطأ في الخادم',
        message: 'حدث خطأ أثناء معالجة طلبك. الرجاء المحاولة مرة أخرى.'
      })
    };
  }
};
