
import { Button } from "./ui/button";
import { Cart } from "./Cart";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useToast } from "./ui/use-toast";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Lỗi",
        description: "Không thể đăng xuất",
        variant: "destructive",
      });
    } else {
      navigate("/auth");
    }
  };

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <a href="/" className="font-display text-2xl">
          Đồng Hồ
        </a>
        <div className="flex items-center gap-8">
          <a href="/" className="hover:text-gold-500 transition-colors">Trang Chủ</a>
          <a href="/browse" className="hover:text-gold-500 transition-colors">Sản Phẩm</a>
          <a href="#about" className="hover:text-gold-500 transition-colors">Giới Thiệu</a>
          {user ? (
            <>
              <Cart />
              <Button variant="outline" onClick={handleSignOut}>
                Đăng Xuất
              </Button>
            </>
          ) : (
            <Button onClick={() => navigate("/auth")}>
              Đăng Nhập
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
