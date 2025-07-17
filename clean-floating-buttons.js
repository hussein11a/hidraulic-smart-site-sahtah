/**
 * الأزرار العائمة النظيفة والمرنة - JavaScript
 * Clean & Flexible Floating Buttons - JavaScript Module
 * 
 * @version 1.0.0
 * @description وحدة JavaScript محسنة للأزرار العائمة مع تركيز على الأداء والتوافق
 */

(function(window, document) {
    'use strict';
    
    // ===================================
    // الإعدادات والمتغيرات الأساسية
    // ===================================
    
    const CONFIG = {
        selectors: {
            container: '.floating-buttons-container',
            button: '.floating-btn',
            callButton: '.floating-btn--call',
            whatsappButton: '.floating-btn--whatsapp'
        },
        classes: {
            loading: 'floating-btn--loading',
            disabled: 'floating-btn--disabled',
            compact: 'floating-btn--compact',
            hidden: 'floating-btn--hidden'
        },
        animations: {
            duration: 300,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
        },
        breakpoints: {
            mobile: 768,
            tablet: 1024
        }
    };
    
    // ===================================
    // فحص دعم المتصفح للميزات
    // ===================================
    
    const SUPPORT = {
        // فحص دعم passive events
        passiveEvents: (function() {
            let supportsPassive = false;
            try {
                const opts = Object.defineProperty({}, 'passive', {
                    get: function() {
                        supportsPassive = true;
                    }
                });
                window.addEventListener('testPassive', null, opts);
                window.removeEventListener('testPassive', null, opts);
            } catch (e) {}
            return supportsPassive;
        })(),
        
        // فحص دعم requestAnimationFrame
        requestAnimationFrame: !!(window.requestAnimationFrame || 
                                 window.webkitRequestAnimationFrame || 
                                 window.mozRequestAnimationFrame),
        
        // فحص دعم CSS transforms
        transforms: (function() {
            const el = document.createElement('div');
            return el.style.transform !== undefined ||
                   el.style.webkitTransform !== undefined ||
                   el.style.mozTransform !== undefined;
        })(),
        
        // فحص دعم touch events
        touch: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
        
        // فحص دعم hover
        hover: window.matchMedia('(hover: hover)').matches
    };
    
    // ===================================
    // الوظائف المساعدة
    // ===================================
    
    const Utils = {
        /**
         * إضافة event listener مع دعم للخيارات المحسنة
         */
        addEventListener: function(element, event, handler, options) {
            if (SUPPORT.passiveEvents && options) {
                element.addEventListener(event, handler, options);
            } else {
                element.addEventListener(event, handler, false);
            }
        },
        
        /**
         * تطبيق transform مع دعم للمتصفحات المختلفة
         */
        setTransform: function(element, value) {
            if (SUPPORT.transforms) {
                element.style.transform = value;
                element.style.webkitTransform = value;
                element.style.mozTransform = value;
            }
        },
        
        /**
         * تنفيذ animation مع requestAnimationFrame
         */
        animate: function(callback) {
            if (SUPPORT.requestAnimationFrame) {
                return requestAnimationFrame(callback);
            } else {
                return setTimeout(callback, 16); // ~60fps fallback
            }
        },
        
        /**
         * إلغاء animation
         */
        cancelAnimate: function(id) {
            if (SUPPORT.requestAnimationFrame) {
                cancelAnimationFrame(id);
            } else {
                clearTimeout(id);
            }
        },
        
        /**
         * فحص ما إذا كان العنصر مرئياً
         */
        isVisible: function(element) {
            return element.offsetWidth > 0 && element.offsetHeight > 0;
        },
        
        /**
         * الحصول على حجم الشاشة الحالي
         */
        getScreenSize: function() {
            return {
                width: window.innerWidth || document.documentElement.clientWidth,
                height: window.innerHeight || document.documentElement.clientHeight
            };
        },
        
        /**
         * فحص ما إذا كان الجهاز محمول
         */
        isMobile: function() {
            return this.getScreenSize().width <= CONFIG.breakpoints.mobile;
        },
        
        /**
         * debounce function لتحسين الأداء
         */
        debounce: function(func, wait) {
            let timeout;
            return function executedFunction() {
                const later = () => {
                    clearTimeout(timeout);
                    func.apply(this, arguments);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },
        
        /**
         * throttle function لتحسين الأداء
         */
        throttle: function(func, limit) {
            let inThrottle;
            return function() {
                const args = arguments;
                const context = this;
                if (!inThrottle) {
                    func.apply(context, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        }
    };
    
    // ===================================
    // فئة الأزرار العائمة الرئيسية
    // ===================================
    
    function FloatingButtons(options) {
        this.options = Object.assign({}, CONFIG, options || {});
        this.container = null;
        this.buttons = [];
        this.isInitialized = false;
        this.animationId = null;
        
        this.init();
    }
    
    FloatingButtons.prototype = {
        /**
         * تهيئة الأزرار العائمة
         */
        init: function() {
            if (this.isInitialized) return;
            
            this.container = document.querySelector(this.options.selectors.container);
            if (!this.container) {
                console.warn('لم يتم العثور على حاوي الأزرار العائمة');
                return;
            }
            
            this.buttons = Array.from(this.container.querySelectorAll(this.options.selectors.button));
            if (!this.buttons.length) {
                console.warn('لم يتم العثور على أزرار عائمة');
                return;
            }
            
            this.setupButtons();
            this.bindEvents();
            this.optimizePerformance();
            
            this.isInitialized = true;
            console.log('✅ تم تهيئة الأزرار العائمة بنجاح');
        },
        
        /**
         * إعداد الأزرار
         */
        setupButtons: function() {
            this.buttons.forEach((button, index) => {
                // إضافة معرف فريد
                if (!button.id) {
                    button.id = 'floating-btn-' + index;
                }
                
                // إضافة خصائص الوصولية
                if (!button.getAttribute('aria-label')) {
                    const text = button.querySelector('.floating-btn__text');
                    if (text) {
                        button.setAttribute('aria-label', text.textContent.trim());
                    }
                }
                
                // إضافة role إذا لم يكن موجوداً
                if (!button.getAttribute('role')) {
                    button.setAttribute('role', 'button');
                }
                
                // تحسين الأداء
                Utils.setTransform(button, 'translateZ(0)');
            });
        },
        
        /**
         * ربط الأحداث
         */
        bindEvents: function() {
            this.buttons.forEach(button => {
                this.bindButtonEvents(button);
            });
            
            this.bindGlobalEvents();
        },
        
        /**
         * ربط أحداث الزر الواحد
         */
        bindButtonEvents: function(button) {
            // أحداث الماوس (للأجهزة التي تدعم hover)
            if (SUPPORT.hover) {
                button.addEventListener('mouseenter', () => {
                    this.onButtonHover(button, true);
                });
                
                button.addEventListener('mouseleave', () => {
                    this.onButtonHover(button, false);
                });
            }
            
            // أحداث اللمس
            if (SUPPORT.touch) {
                Utils.addEventListener(button, 'touchstart', () => {
                    this.onButtonTouch(button, true);
                }, { passive: true });
                
                Utils.addEventListener(button, 'touchend', () => {
                    this.onButtonTouch(button, false);
                }, { passive: true });
            }
            
            // حدث النقر
            button.addEventListener('click', (e) => {
                this.onButtonClick(button, e);
            });
            
            // أحداث لوحة المفاتيح
            button.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.onButtonClick(button, e);
                }
            });
        },
        
        /**
         * ربط الأحداث العامة
         */
        bindGlobalEvents: function() {
            // تحسين الأداء أثناء التمرير
            Utils.addEventListener(window, 'scroll', 
                Utils.throttle(() => this.onScroll(), 16), 
                { passive: true }
            );
            
            // تحسين تغيير حجم النافذة
            Utils.addEventListener(window, 'resize', 
                Utils.debounce(() => this.onResize(), 250)
            );
            
            // تحسين تغيير الاتجاه
            Utils.addEventListener(window, 'orientationchange', 
                Utils.debounce(() => this.onOrientationChange(), 300)
            );
        },
        
        /**
         * معالج hover
         */
        onButtonHover: function(button, isHovering) {
            if (this.isButtonDisabled(button)) return;
            
            const transform = isHovering ? 
                'translateY(-2px) translateZ(0)' : 
                'translateY(0) translateZ(0)';
            
            Utils.setTransform(button, transform);
        },
        
        /**
         * معالج اللمس
         */
        onButtonTouch: function(button, isTouching) {
            if (this.isButtonDisabled(button)) return;
            
            const transform = isTouching ? 
                'translateY(-1px) translateZ(0)' : 
                'translateY(0) translateZ(0)';
            
            Utils.setTransform(button, transform);
        },
        
        /**
         * معالج النقر
         */
        onButtonClick: function(button, event) {
            if (this.isButtonDisabled(button)) {
                event.preventDefault();
                return false;
            }
            
            // تأثير النقر
            Utils.setTransform(button, 'translateY(0) translateZ(0)');
            
            setTimeout(() => {
                Utils.setTransform(button, '');
            }, 150);
            
            // تسجيل النقر للتحليلات (اختياري)
            this.trackButtonClick(button);
        },
        
        /**
         * معالج التمرير
         */
        onScroll: function() {
            // يمكن إضافة منطق إضافي هنا
            // مثل إخفاء/إظهار الأزرار حسب موضع التمرير
        },
        
        /**
         * معالج تغيير حجم النافذة
         */
        onResize: function() {
            this.updateButtonsPosition();
        },
        
        /**
         * معالج تغيير الاتجاه
         */
        onOrientationChange: function() {
            setTimeout(() => {
                this.updateButtonsPosition();
            }, 100);
        },
        
        /**
         * تحديث مواضع الأزرار
         */
        updateButtonsPosition: function() {
            // إعادة حساب المواضع إذا لزم الأمر
            console.log('تم تحديث مواضع الأزرار العائمة');
        },
        
        /**
         * فحص ما إذا كان الزر معطل
         */
        isButtonDisabled: function(button) {
            return button.classList.contains(this.options.classes.disabled) ||
                   button.classList.contains(this.options.classes.loading) ||
                   button.hasAttribute('disabled');
        },
        
        /**
         * تسجيل النقر للتحليلات
         */
        trackButtonClick: function(button) {
            const buttonType = button.classList.contains('floating-btn--call') ? 'call' : 'whatsapp';
            console.log('تم النقر على زر:', buttonType);
            
            // يمكن إضافة كود Google Analytics أو أي نظام تحليلات آخر هنا
            if (typeof gtag !== 'undefined') {
                gtag('event', 'click', {
                    event_category: 'floating_button',
                    event_label: buttonType
                });
            }
        },
        
        /**
         * تحسين الأداء
         */
        optimizePerformance: function() {
            // تطبيق تحسينات CSS
            if (this.container) {
                this.container.style.willChange = 'transform';
                Utils.setTransform(this.container, 'translateZ(0)');
            }
            
            this.buttons.forEach(button => {
                button.style.willChange = 'transform, box-shadow';
                button.style.backfaceVisibility = 'hidden';
            });
        },
        
        /**
         * إظهار زر
         */
        showButton: function(buttonSelector) {
            const button = typeof buttonSelector === 'string' ? 
                document.querySelector(buttonSelector) : buttonSelector;
            
            if (button) {
                button.classList.remove(this.options.classes.hidden);
                button.style.display = '';
            }
        },
        
        /**
         * إخفاء زر
         */
        hideButton: function(buttonSelector) {
            const button = typeof buttonSelector === 'string' ? 
                document.querySelector(buttonSelector) : buttonSelector;
            
            if (button) {
                button.classList.add(this.options.classes.hidden);
                button.style.display = 'none';
            }
        },
        
        /**
         * تفعيل زر
         */
        enableButton: function(buttonSelector) {
            const button = typeof buttonSelector === 'string' ? 
                document.querySelector(buttonSelector) : buttonSelector;
            
            if (button) {
                button.classList.remove(this.options.classes.disabled);
                button.removeAttribute('disabled');
            }
        },
        
        /**
         * تعطيل زر
         */
        disableButton: function(buttonSelector) {
            const button = typeof buttonSelector === 'string' ? 
                document.querySelector(buttonSelector) : buttonSelector;
            
            if (button) {
                button.classList.add(this.options.classes.disabled);
                button.setAttribute('disabled', 'disabled');
            }
        },
        
        /**
         * إظهار حالة التحميل
         */
        showLoading: function(buttonSelector) {
            const button = typeof buttonSelector === 'string' ? 
                document.querySelector(buttonSelector) : buttonSelector;
            
            if (button) {
                button.classList.add(this.options.classes.loading);
            }
        },
        
        /**
         * إخفاء حالة التحميل
         */
        hideLoading: function(buttonSelector) {
            const button = typeof buttonSelector === 'string' ? 
                document.querySelector(buttonSelector) : buttonSelector;
            
            if (button) {
                button.classList.remove(this.options.classes.loading);
            }
        },
        
        /**
         * تدمير الأزرار العائمة
         */
        destroy: function() {
            if (!this.isInitialized) return;
            
            // إزالة الأحداث
            this.buttons.forEach(button => {
                button.removeEventListener('mouseenter', this.onButtonHover);
                button.removeEventListener('mouseleave', this.onButtonHover);
                button.removeEventListener('touchstart', this.onButtonTouch);
                button.removeEventListener('touchend', this.onButtonTouch);
                button.removeEventListener('click', this.onButtonClick);
                button.removeEventListener('keydown', this.onButtonClick);
            });
            
            // إلغاء الرسوم المتحركة
            if (this.animationId) {
                Utils.cancelAnimate(this.animationId);
            }
            
            this.isInitialized = false;
            console.log('تم تدمير الأزرار العائمة');
        }
    };
    
    // ===================================
    // التهيئة التلقائية
    // ===================================
    
    function autoInit() {
        // انتظار تحميل DOM
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                new FloatingButtons();
            });
        } else {
            new FloatingButtons();
        }
    }
    
    // ===================================
    // تصدير الوحدة
    // ===================================
    
    // تصدير للاستخدام العام
    window.FloatingButtons = FloatingButtons;
    window.FloatingButtonsUtils = Utils;
    
    // التهيئة التلقائية
    autoInit();
    
    // دعم AMD/CommonJS
    if (typeof define === 'function' && define.amd) {
        define(function() {
            return FloatingButtons;
        });
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = FloatingButtons;
    }
    
})(window, document);

