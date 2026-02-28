import ProductDetailPage from './ProductClient';

export function generateStaticParams() {
    return [{ id: 'pro-toilet-cleaner' }];
}

export default function Page() {
    return <ProductDetailPage />;
}
