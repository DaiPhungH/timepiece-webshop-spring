
import { Clock } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="font-display text-4xl">Di Sản Của Chúng Tôi</h2>
            <p className="text-gray-600 leading-relaxed">
              Kể từ năm 1875, chúng tôi đã chế tác những chiếc đồng hồ đặc biệt kết hợp giữa kỹ thuật làm đồng hồ truyền thống với thiết kế đương đại. Mỗi chiếc đồng hồ là minh chứng cho cam kết của chúng tôi về chất lượng và độ chính xác.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Clock className="h-8 w-8 text-gold-500" />
                <h3 className="font-semibold">Kỹ Thuật Chế Tác</h3>
                <p className="text-sm text-gray-600">Được làm thủ công bởi những người thợ bậc thầy</p>
              </div>
              <div className="space-y-2">
                <Clock className="h-8 w-8 text-gold-500" />
                <h3 className="font-semibold">Vật Liệu Cao Cấp</h3>
                <p className="text-sm text-gray-600">Chỉ sử dụng những vật liệu tốt nhất</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80"
              alt="Quá trình làm đồng hồ"
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
