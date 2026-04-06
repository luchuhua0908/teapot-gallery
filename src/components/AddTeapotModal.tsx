"use client";

import { useState } from "react";
import { addTeapot } from "@/actions/teapots";
import { X } from "lucide-react";

export default function AddTeapotModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const result = await addTeapot(formData);
    
    if (result.success) {
      setIsOpen(false);
    } else {
      alert(result.error);
    }
    setLoading(false);
  }

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="bg-amber-700 hover:bg-amber-800 text-white px-4 py-2 rounded-md shadow-sm transition"
      >
        + 新增藏品
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-stone-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-stone-100 flex justify-between items-center bg-stone-50">
              <h3 className="text-lg font-bold text-stone-800">新增紫砂壺紀錄</h3>
              <button onClick={() => setIsOpen(false)} className="text-stone-400 hover:text-stone-600">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-stone-700">壺名</label>
                  <input required name="name" type="text" placeholder="例：景舟石瓢" className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-stone-700">泥料</label>
                  <input required name="clayType" type="text" placeholder="例：底槽清" className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-stone-700">作者 / 工藝師</label>
                  <input required name="maker" type="text" placeholder="例：顧景舟" className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-stone-700">容量 (ml)</label>
                  <input required name="capacityMl" type="number" min="1" placeholder="例：260" className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-stone-700">介紹與特色</label>
                <textarea name="description" rows={3} placeholder="描述此壺的地方特色、出水表現等..." className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"></textarea>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsOpen(false)} className="px-4 py-2 text-stone-600 hover:text-stone-800 font-medium">取消</button>
                <button type="submit" disabled={loading} className="bg-amber-700 hover:bg-amber-800 text-white px-6 py-2 rounded-md font-medium disabled:opacity-50">
                  {loading ? '儲存中...' : '確認新增'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
