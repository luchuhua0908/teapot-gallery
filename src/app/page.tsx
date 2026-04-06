import AddTeapotModal from "@/components/AddTeapotModal";
import { getDb } from "@/db";
import { teapots } from "@/db/schema";
import { ImageIcon } from "lucide-react";

// For Cloudflare Pages, we must force dynamic rendering if we read from DB on every request.
export const dynamic = 'force-dynamic';

export default async function Home() {
  // Try to fetch teapots from the database
  let items: any[] = [];
  let dbError = null;
  
  try {
    const db = getDb();
    if (db) {
      items = await db.select().from(teapots);
    }
  } catch (e: any) {
    dbError = e.message;
    console.warn("Database connection issue. Using fallback data.", e);
    // Dummy data so you can see the UI locally even if D1 isn't bound yet
    items = [
      {
        id: 1,
        name: "景舟石瓢",
        clayType: "底槽清",
        maker: "顧景舟 (仿)",
        capacityMl: 260,
        description: "經典石瓢壺型，骨肉亭勻，出水爽利。",
        imageUrl: null,
      },
      {
        id: 2,
        name: "水平壺",
        clayType: "朱泥",
        maker: "無名",
        capacityMl: 120,
        description: "閩南功夫茶必備，紅潤透亮，發茶性極佳。",
        imageUrl: null,
      }
    ];
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-stone-800">館藏展示</h2>
          <p className="text-stone-500 mt-2">瀏覽您的紫砂壺藏品與詳細紀錄</p>
        </div>
        <button className="bg-amber-700 hover:bg-amber-800 text-white px-4 py-2 rounded-md shadow-sm transition">
          + 新增藏品
        </button>
      </div>

      {dbError && (
        <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-r text-orange-800 text-sm">
          目前使用展示用假資料。（開發中提示：本地端使用 Next.js dev server 時無法直接綁定 D1，請利用 wrangler 預覽，或無視此訊息繼續開發介面。）
        </div>
      )}

      {items.length === 0 ? (
        <div className="text-center py-20 bg-stone-100 rounded-lg border border-stone-200 border-dashed">
          <p className="text-stone-500">目前還沒有任何紫砂壺記錄，點擊右上角新增您的第一把壺吧！</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((teapot) => (
            <div key={teapot.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-stone-200 transition group cursor-pointer">
              <div className="aspect-[4/3] bg-stone-100 relative items-center justify-center flex overflow-hidden">
                {teapot.imageUrl ? (
                  <img src={teapot.imageUrl} alt={teapot.name} className="object-cover w-full h-full group-hover:scale-105 transition duration-300" />
                ) : (
                  <div className="flex flex-col items-center justify-center text-stone-300">
                    <ImageIcon size={48} strokeWidth={1} />
                    <span className="text-xs mt-2">暫無圖片</span>
                  </div>
                )}
                <div className="absolute top-2 right-2 bg-stone-900/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded">
                  {teapot.capacityMl} ml
                </div>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-stone-800">{teapot.name}</h3>
                  <span className="inline-block bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full whitespace-nowrap">
                    {teapot.clayType}
                  </span>
                </div>
                <div className="text-sm border-b border-stone-100 pb-3 mb-3">
                  <span className="text-stone-500">作者 / </span>
                  <span className="font-medium text-stone-700">{teapot.maker}</span>
                </div>
                <p className="text-sm text-stone-600 line-clamp-2">
                  {teapot.description || '暫無描述。'}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
