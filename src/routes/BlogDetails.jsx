import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function BlogDetails() {
  const { t } = useTranslation();

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "فساتين زفاف",
          text: "فساتين زفاف",
          url: window.location.href,
        })
        .then(() => t("Shared successfully"))
        .catch((error) => t("Error sharing:", error));
    } else {
      alert(t("share_not_supported"));
    }
  };

  return (
    <section className="blog_details">
      <div className="container">
        <div className="row">
          <div className="col-lg-9 col-12 p-2">
            <div className="blog_header">
              <h1>أحدث صيحات فساتين الزفاف لعام 2024</h1>
              <div className="blog_header_actions">
                <span className="date">
                  <i className="fa-light fa-calendar-days"></i> 15 مارس 2024
                </span>
                <button className="share" onClick={handleShare}>
                  <i className="fa-light fa-share-nodes"></i>
                </button>
              </div>
            </div>
            <div className="blog_content">
              <div className="img">
                <img src="/images/blog.jpg" alt="فساتين زفاف 2024" />
              </div>

              <div className="content-text">
                <h3>اتجاهات فساتين الزفاف لعام 2024</h3>
                <p>
                  يشهد عالم فساتين الزفاف تطورات مذهلة في عام 2024، حيث تمتزج
                  الأناقة الكلاسيكية مع اللمسات العصرية. نستعرض معكم أبرز صيحات
                  هذا العام:
                </p>

                <h3>الاتجاهات الرئيسية</h3>
                <ul>
                  <li>
                    <strong>الأكمام المنتفخة:</strong> عودة قوية لأكمام الأميرات
                    بتصاميم عصرية وخفيفة
                  </li>
                  <li>
                    <strong>الفساتين المنفصلة:</strong> تصاميم قابلة للتحويل
                    تجمع بين إطلالتين في فستان واحد
                  </li>
                  <li>
                    <strong>التطريزات الثلاثية الأبعاد:</strong> زخارف وورود
                    بارزة تضيف لمسة فنية مميزة
                  </li>
                </ul>
                <br />

                <h4>الأقمشة المفضلة لعام 2024</h4>
                <p>تتنوع الأقمشة المستخدمة هذا العام لتلبي مختلف الأذواق:</p>
                <ol>
                  <li>الحرير الطبيعي الناعم</li>
                  <li>الدانتيل الفرنسي الفاخر</li>
                  <li>التول المطرز بالكريستال</li>
                  <li>الأورجنزا الشفافة</li>
                </ol>

                <blockquote>
                  &ldquo;تميل موضة 2024 إلى البساطة الفاخرة مع لمسات درامية تعكس
                  شخصية العروس العصرية&rdquo;
                </blockquote>

                <h4>تفاصيل مهمة في اختيار الفستان</h4>
                <p>عند اختيار فستان الزفاف، يجب مراعاة النقاط التالية:</p>
                <ul>
                  <li>
                    <strong>شكل الجسم:</strong> اختيار القصة المناسبة لشكل الجسم
                  </li>
                  <li>
                    <strong>موسم الزفاف:</strong> اختيار الأقمشة المناسبة للطقس
                  </li>
                  <li>
                    <strong>مكان الحفل:</strong> تناسق الفستان مع طبيعة المكان
                    وأجوائه
                  </li>
                  <li>
                    <strong>الإكسسوارات:</strong> تنسيق الطرحة والمجوهرات مع
                    الفستان
                  </li>
                </ul>
                <br />

                <h3>الألوان والدرجات</h3>
                <p>تتنوع درجات الأبيض في فساتين 2024 لتشمل:</p>
                <ul>
                  <li>الأبيض النقي الناصع</li>
                  <li>العاجي الدافئ</li>
                  <li>الشامبين الأنيق</li>
                </ul>
                <br />

                <h3>نصائح ختامية</h3>
                <p>
                  تذكري أن اختيار فستان الزفاف تجربة شخصية فريدة. ابحثي عن
                  التصميم الذي يعكس شخصيتك ويجعلك تشعرين بالراحة والثقة. لا
                  تترددي في تجربة أنماط مختلفة قبل اتخاذ قرارك النهائي، واحرصي
                  على حجز موعد التفصيل قبل موعد الزفاف بوقت كافٍ.
                </p>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-12 p-2">
            <div className="recent_blogs">
              <h3>المقالات الأخيرة</h3>

              <ul>
                <li>
                  <Link to="/blogs/1">
                    <h4>أحدث صيحات فساتين الزفاف لعام 2024</h4>
                  </Link>
                </li>
                <li>
                  <Link to="/blogs/2">
                    <h4>اتجاهات الموضة للعرائس</h4>
                  </Link>
                </li>
                <li>
                  <Link to="/blogs/3">
                    <h4>نصائح لاختيار فستان الزفاف المثالي</h4>
                  </Link>
                </li>
                <li>
                  <Link to="/blogs/4">
                    <h4>إكسسوارات العروس العصرية</h4>
                  </Link>
                </li>
                <li>
                  <Link to="/blogs/5">
                    <h4>تسريحات شعر العروس</h4>
                  </Link>
                </li>
                <li>
                  <Link to="/blogs/6">
                    <h4>مكياج العروس لإطلالة مثالية</h4>
                  </Link>
                </li>
                <li>
                  <Link to="/blogs/7">
                    <h4>باقات الورد للعروس</h4>
                  </Link>
                </li>
                <li>
                  <Link to="/blogs/8">
                    <h4>تنظيم حفلات الزفاف</h4>
                  </Link>
                </li>
                <li>
                  <Link to="/blogs/9">
                    <h4>قاعات الأفراح المميزة</h4>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
