import ProductoClient from './ProductoClient';

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  return <ProductoClient params={params} />;
}
