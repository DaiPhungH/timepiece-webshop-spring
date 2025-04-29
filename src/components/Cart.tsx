
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { ShoppingCart, Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "./ui/badge";

export function Cart() {
  const { items, removeItem, updateQuantity } = useCart();
  const { toast } = useToast();
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);

  const handleRemoveItem = (id: string, name: string) => {
    removeItem(id);
    toast({
      title: "Đã xóa sản phẩm",
      description: `${name} đã được xóa khỏi giỏ hàng của bạn`,
    });
  };

  const handleUpdateQuantity = (id: string, quantity: number, name: string) => {
    updateQuantity(id, quantity);
    toast({
      title: "Đã cập nhật số lượng",
      description: `Số lượng ${name} đã được cập nhật thành ${quantity}`,
    });
  };

  const handleCheckout = () => {
    toast({
      title: "Đặt hàng thành công!",
      description: "Cảm ơn bạn đã mua hàng. Chúng tôi sẽ xử lý đơn hàng của bạn sớm.",
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5 text-slate-800" />
          {items.length > 0 && (
            <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs font-bold rounded-full">
              {itemCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md overflow-hidden flex flex-col">
        <SheetHeader className="border-b pb-4">
          <SheetTitle className="text-2xl font-display">Giỏ Hàng</SheetTitle>
        </SheetHeader>
        
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-1 py-12">
            <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-xl font-medium text-muted-foreground">Giỏ hàng của bạn đang trống</p>
            <p className="text-sm text-muted-foreground mt-2">Thêm một số sản phẩm đẹp để bắt đầu</p>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-6 py-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="relative h-24 w-24 rounded-md overflow-hidden bg-secondary">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="object-cover h-full w-full transition-all group-hover:scale-105" 
                      />
                    </div>
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between">
                        <h3 className="font-medium text-base">{item.name}</h3>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => handleRemoveItem(item.id, item.name)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{item.price.toLocaleString()} VNĐ</p>
                      <div className="flex items-center mt-auto pt-2">
                        <div className="flex items-center border rounded-md">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-none"
                            onClick={() => handleUpdateQuantity(item.id, Math.max(1, item.quantity - 1), item.name)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-none"
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1, item.name)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <span className="ml-auto font-medium">
                          {(item.price * item.quantity).toLocaleString()} VNĐ
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            <div className="border-t pt-6 mt-auto space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Tạm tính</span>
                <span>{total.toLocaleString()} VNĐ</span>
              </div>
              <div className="flex items-center justify-between font-medium text-lg">
                <span>Tổng cộng</span>
                <span>{total.toLocaleString()} VNĐ</span>
              </div>
              <Button 
                className="w-full bg-gold-500 hover:bg-gold-600 text-white h-12 text-base font-medium transition-all"
                onClick={handleCheckout}
              >
                Thanh Toán
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
