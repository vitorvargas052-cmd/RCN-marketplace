// Salva o comentário
const { data, error } = await supabase.from("comments").insert([
  { user_id, product_id, text },
]);

// Dispara notificação pro dono do produto
await supabase.from("notifications").insert([
  {
    user_id: productOwnerId,
    message: "💬 Você recebeu um novo comentário no seu anúncio!",
  },
]);
