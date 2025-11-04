await supabase.from("notifications").insert([
  {
    user_id: sellerId,
    message: "💰 Seu produto foi vendido com sucesso!",
  },
]);
