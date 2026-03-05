"use client";

import { FormEvent, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/components/AuthProvider";

type MessageDto = {
  id: string;
  content: string;
  createdAt: string;
  senderEmail: string;
};

type Props = {
  opportunityId: string;
};

export function MessagingInterface({ opportunityId }: Props) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [content, setContent] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["messages", opportunityId],
    queryFn: async (): Promise<MessageDto[]> => {
      const res = await fetch(`/api/opportunities/${opportunityId}/messages`);
      if (!res.ok) throw new Error("Failed to load messages");
      return res.json();
    }
  });

  const mutation = useMutation({
    mutationFn: async (body: { content: string }) => {
      const res = await fetch(`/api/opportunities/${opportunityId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: body.content,
          senderEmail: user?.email
        })
      });
      if (!res.ok) throw new Error("Failed to send message");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages", opportunityId] });
      setContent("");
    }
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !user?.email) return;
    mutation.mutate({ content: content.trim() });
  };

  return (
    <section className="space-y-3 bg-white border rounded-xl p-3">
      <h2 className="font-semibold text-sm">المراسلة مع المستشار</h2>
      {!user && (
        <p className="text-xs text-slate-600">
          سجّل الدخول للبدء في التراسل مع المستشار حول هذه الفرصة.
        </p>
      )}
      <div className="h-40 overflow-y-auto border rounded p-2 bg-slate-50 text-xs space-y-2">
        {isLoading && <p>جاري تحميل الرسائل...</p>}
        {!isLoading && !data?.length && <p>لا توجد رسائل بعد.</p>}
        {data?.map((m) => (
          <div key={m.id} className="space-y-0.5">
            <p className="font-semibold">{m.senderEmail}</p>
            <p>{m.content}</p>
            <p className="text-[10px] text-slate-500">
              {new Date(m.createdAt).toLocaleString("ar-SA")}
            </p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          className="flex-1 rounded border px-2 py-1 text-xs"
          placeholder="اكتب رسالتك للمستشار..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={!user || mutation.isPending}
        />
        <button
          type="submit"
          disabled={!user || mutation.isPending}
          className="px-3 py-1 rounded bg-slate-900 text-white text-xs disabled:opacity-60"
        >
          إرسال
        </button>
      </form>
    </section>
  );
}

