
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface FAQProps {
  isDarkMode: boolean;
}

const FAQ: React.FC<FAQProps> = ({ isDarkMode }) => {
  const [openItem, setOpenItem] = useState<number | null>(0);

  const faqs = [
    {
      question: 'كم يستغرق وصول السطحة؟',
      answer: 'عادة نصل في خلال 15-30 دقيقة داخل المدينة، وقد يستغرق الأمر وقتاً أطول قليلاً للمناطق البعيدة. نحن نعمل على تقليل وقت الانتظار قدر الإمكان.'
    },
    {
      question: 'هل الخدمة متاحة 24 ساعة؟',
      answer: 'نعم، نحن متاحون على مدار الساعة طوال أيام الأسبوع لخدمتكم. لا يهم الوقت، يمكنكم الاتصال بنا في أي وقت تحتاجون فيه المساعدة.'
    },
    {
      question: 'كيف يتم تحديد السعر؟',
      answer: 'يتم تحديد السعر بناءً على المسافة ونوع السيارة ووقت الخدمة. نقدم أسعار تنافسية وشفافة بدون أي رسوم خفية.'
    },
    {
      question: 'هل السيارة مؤمنة أثناء النقل؟',
      answer: 'نعم، جميع سياراتنا مؤمنة بالكامل وتوفر حماية شاملة لسيارتكم أثناء النقل. سلامة سيارتكم أولويتنا القصوى.'
    },
    {
      question: 'ما هي أنواع السيارات التي يمكنكم نقلها؟',
      answer: 'نستطيع نقل جميع أنواع السيارات: العادية، الفاخرة، الرياضية، الدراجات النارية، والمركبات التجارية الصغيرة.'
    },
    {
      question: 'هل يمكنني تتبع موقع السطحة؟',
      answer: 'نعم، سنرسل لكم موقع السائق عبر واتساب ويمكنكم متابعة وصوله إليكم في الوقت الفعلي.'
    },
    {
      question: 'ماذا لو لم تعمل السيارة نهائياً؟',
      answer: 'لدينا معدات خاصة وزلاجات لسحب السيارات التي لا تعمل نهائياً، حتى لو كان القير معطل أو العجلات لا تدور.'
    },
    {
      question: 'هل تقدمون خدمات أخرى غير النقل؟',
      answer: 'نعم، نقدم خدمة تشغيل البطارية، تغيير الإطارات، وخدمات الطوارئ الأساسية على الطريق.'
    }
  ];

  const toggleItem = (index: number) => {
    setOpenItem(openItem === index ? null : index);
  };

  return (
    <section className={`py-20 ${isDarkMode ? 'bg-slate-900/50' : 'bg-slate-50'}`} id="faq">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className={`p-4 rounded-full ${
              isDarkMode ? 'bg-blue-600/20' : 'bg-blue-100'
            }`}>
              <HelpCircle className={`h-8 w-8 ${
                isDarkMode ? 'text-blue-400' : 'text-blue-600'
              }`} />
            </div>
          </div>
          <h2 className={`text-4xl md:text-6xl font-black mb-6 ${
            isDarkMode ? 'text-white' : 'text-slate-800'
          }`}>
            الأسئلة الشائعة
          </h2>
          <div className={`w-24 h-1 mx-auto rounded-full mb-6 ${
            isDarkMode ? 'bg-gradient-to-r from-amber-400 to-blue-400' : 'bg-gradient-to-r from-amber-500 to-blue-500'
          }`}></div>
          <p className={`text-xl max-w-3xl mx-auto ${
            isDarkMode ? 'text-slate-300' : 'text-slate-600'
          }`}>
            إجابات على أكثر الأسئلة التي يطرحها عملاؤنا
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`mb-4 rounded-2xl shadow-lg border overflow-hidden transition-all duration-300 ${
                isDarkMode
                  ? 'bg-slate-700/60 border-slate-600'
                  : 'bg-white border-slate-200'
              }`}
            >
              <button
                onClick={() => toggleItem(index)}
                className={`w-full p-6 text-right flex justify-between items-center transition-colors duration-300 ${
                  isDarkMode
                    ? 'hover:bg-slate-600/70'
                    : 'hover:bg-slate-50'
                }`}
              >
                <h3 className={`text-lg font-bold ${
                  isDarkMode ? 'text-white' : 'text-slate-800'
                }`}>
                  {faq.question}
                </h3>
                {openItem === index ? (
                  <ChevronUp className={`h-6 w-6 ${
                    isDarkMode ? 'text-amber-400' : 'text-blue-500'
                  }`} />
                ) : (
                  <ChevronDown className={`h-6 w-6 ${
                    isDarkMode ? 'text-amber-400' : 'text-blue-500'
                  }`} />
                )}
              </button>
              
              {openItem === index && (
                <div className={`px-6 pb-6 border-t ${
                  isDarkMode ? 'border-slate-600' : 'border-slate-200'
                }`}>
                  <p className={`text-lg leading-relaxed mt-4 ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className={`inline-block p-8 rounded-3xl shadow-2xl border-2 ${
            isDarkMode
              ? 'bg-gradient-to-r from-blue-600/20 to-green-600/20 border-blue-400/50'
              : 'bg-gradient-to-r from-blue-50 to-green-50 border-blue-200'
          }`}>
            <h3 className={`text-2xl font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-slate-800'
            }`}>
              لم تجد إجابة لسؤالك؟
            </h3>
            <p className={`text-lg mb-6 ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              تواصل معنا مباشرة وسنجيب على جميع استفساراتك
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <span className="flex items-center gap-2 text-blue-500 font-semibold">
                📞 +966503269219
              </span>
              <span className="flex items-center gap-2 text-green-500 font-semibold">
                💬 واتساب متاح
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
