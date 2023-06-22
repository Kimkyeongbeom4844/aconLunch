import { Inter } from "next/font/google";
import Provider from "@/stores/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "아콘점심요정",
  description: "아이디어 콘서트 점심메뉴 고르는 사이트",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="kr">
      <Provider>
        <body className={inter.className}>{children}</body>
      </Provider>
    </html>
  );
}
