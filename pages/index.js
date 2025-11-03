"use client";
import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import ProductCard from "../components/ProductCard";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filters, setFilters] = useState({
    category: "all",
    sort: "recent",
    minPrice: "",
    maxPrice: "",
  });

  // 🔄 Busca produtos do Supabase (ou simulação temporária)
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
        setFiltered(data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    }
    fetchProducts();
  }, []);

  // 🧠 Atualiza os filtros
  useEffect(() => {
    let result = [...products];

    // Filtra por categoria
    if (filters.category !== "all") {
      result = result.filter((p) => p.category === filters.category);
    }

    // Filtra por preço
    if (filters.minPrice) {
      result = result.filter((p) => p.price >= parseFloat(filters.minPrice));
    }
    if (filters.maxPrice) {
      result = result.filter((p) => p.price <= parseFloat(filters.maxPrice));
    }

    // Ordena
    if (filters.sort === "low") {
      result.sort((a, b) => a.price - b.price);
    } else if (filters.sort === "high") {
      result.sort((a, b) => b.price - a.price);
    } else if (filters.sort === "popular") {
      result.sort((a, b) => b.clicks - a.clicks);
    }

    setFiltered(result);
  }, [filters, products]);

  return (
    <Layout>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Painel de Filtros */}
        <aside className="lg:w-1/4 bg-[#121212] border border-gray-800 rounded-2xl p-5 shadow-md">
          <h2 className="text-lg font-semibold mb-3 text-emerald-400">
            Filtros
          </h2>

          {/* Categoria */}
          <label className="block text-sm text-gray-400 mb-2">Categoria</label>
          <select
            className="w-full bg-[#181818] text-gray-300 rounded-md p-2 mb-4"
            value={filters.category}
            onChange={(e) =>
              setFilters((f) => ({ ...f, category: e.target.value }))
            }
          >
            <option value="all">Todas</option>
            <option value="eletronicos">Eletrônicos</option>
            <option value="roupas">Roupas</option>
            <option value="acessorios">Acessórios</option>
            <option value="casa">Casa</option>
          </select>

          {/* Ordenar */}
          <label className="block text-sm text-gray-400 mb-2">
            Ordenar por
          </label>
          <select
            className="w-full bg-[#181818] text-gray-300 rounded-md p-2 mb-4"
            value={filters.sort}
            onChange={(e) =>
              setFilters((f) => ({ ...f, sort: e.target.value }))
            }
          >
            <option value="recent">Mais recentes</option>
            <option value="low">Menor preço</option>
            <option value="high">Maior preço</option>
            <option value="popular">Mais populares</option>
          </select>

          {/* Preço mínimo e máximo */}
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Mín R$"
              value={filters.minPrice}
              onChange={(e) =>
                setFilters((f) => ({ ...f, minPrice: e.target.value }))
              }
              className="w-1/2 bg-[#181818] text-gray-300 rounded-md p-2 mb-4"
            />
            <input
              type="number"
              placeholder="Máx R$"
              value={filters.maxPrice}
              onChange={(e) =>
                setFilters((f) => ({ ...f, maxPrice: e.target.value }))
              }
              className="w-1/2 bg-[#181818] text-gray-300 rounded-md p-2 mb-4"
            />
          </div>
        </aside>

        {/* Área dos produtos */}
        <section className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.length > 0 ? (
            filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-full">
              Nenhum produto encontrado 😔
            </p>
          )}
        </section>
      </div>
    </Layout>
  );
            }
