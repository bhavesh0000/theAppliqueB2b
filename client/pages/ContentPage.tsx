import Layout from "@/components/layout/Layout";
import { useParams } from "react-router-dom";
import { usePage } from "@/lib/api";

export default function ContentPage() {
  const params = useParams();
  const slug = params.slug ?? "";
  const { data, isLoading, isError } = usePage(slug);

  return (
    <Layout>
      <div className="container py-16">
        {isLoading && <p>Loading...</p>}
        {isError && <p>Failed to load</p>}
        {data && (
          <article>
            <h1 className="text-3xl font-semibold mb-4">{data.title}</h1>
            <div className="max-w-3xl text-foreground/85 leading-relaxed">{data.content}</div>
          </article>
        )}
      </div>
    </Layout>
  );
}
