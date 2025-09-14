import React from "react";
import { Card, CardContent, Skeleton, Typography } from "@mui/material";

interface ProductsSkeletonProps {
    viewMode?: "grid" | "list";
    itemsCount?: number;
}

const ProductCardSkeleton: React.FC<{ viewMode: "grid" | "list" }> = ({ viewMode }) => {
    if (viewMode === "list") {
        return (
            <Card className="mb-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex-1 mr-4">
                            <div className="flex items-center justify-between mb-2">
                                <Skeleton variant="text" width="60%" height={32} className="animate-pulse" />
                                <Skeleton variant="circular" width={40} height={40} className="animate-pulse" />
                            </div>
                            <div className="flex items-center gap-4 mb-2">
                                <Skeleton variant="text" width="30%" height={24} className="animate-pulse" />
                                <Skeleton variant="rounded" width={80} height={24} className="animate-pulse" />
                            </div>
                            <div className="flex items-center gap-6">
                                <Skeleton variant="text" width="25%" height={28} className="animate-pulse" />
                                <Skeleton variant="text" width="20%" height={24} className="animate-pulse" />
                                <Skeleton variant="text" width="30%" height={20} className="animate-pulse" />
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Skeleton variant="circular" width={36} height={36} className="animate-pulse" />
                            <Skeleton variant="circular" width={36} height={36} className="animate-pulse" />
                            <Skeleton variant="circular" width={36} height={36} className="animate-pulse" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="h-full bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="h-full flex flex-col p-4">
                <div className="flex justify-between items-start mb-3">
                    <Skeleton variant="text" width="70%" height={28} className="animate-pulse" />
                    <Skeleton variant="circular" width={32} height={32} className="animate-pulse" />
                </div>
                <Skeleton variant="text" width="50%" height={20} className="mb-3 animate-pulse" />
                <Skeleton variant="text" width="40%" height={32} className="mb-3 animate-pulse" />
                <div className="flex justify-between items-center mb-3">
                    <Skeleton variant="text" width="35%" height={20} className="animate-pulse" />
                    <Skeleton variant="rounded" width={60} height={24} className="animate-pulse" />
                </div>
                <Skeleton variant="text" width="60%" height={16} className="mt-auto animate-pulse" />
            </CardContent>
        </Card>
    );
};

const FiltersSkeleton: React.FC = () => (
    <Card className="mb-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
        <CardContent className="p-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <Skeleton variant="rounded" height={40} className="animate-pulse w-full" />
                <Skeleton variant="rounded" height={40} className="animate-pulse w-full" />
                <div className="flex justify-end gap-3">
                    <Skeleton variant="rounded" width={80} height={40} className="animate-pulse" />
                    <Skeleton variant="rounded" width={80} height={40} className="animate-pulse" />
                </div>
            </div>
        </CardContent>
    </Card>
);

const HeaderSkeleton: React.FC = () => (
    <div className="mb-6">
        <Skeleton variant="text" width="40%" height={48} className="mb-2 animate-pulse" />
        <Skeleton variant="text" width="60%" height={24} className="animate-pulse" />
    </div>
);

const PaginationSkeleton: React.FC = () => (
    <div className="flex justify-center mt-6">
        <Skeleton variant="rounded" width={300} height={48} className="animate-pulse" />
    </div>
);

const ProductsSkeleton: React.FC<ProductsSkeletonProps> = ({ viewMode = "grid", itemsCount = 8 }) => {
    return (
        <div className="p-6 bg-white dark:bg-gray-900 min-h-screen">
            <HeaderSkeleton />
            <FiltersSkeleton />
            <div className={`grid ${viewMode === "list" ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"} gap-6 mb-6`}>
                {Array.from({ length: itemsCount }).map((_, index) => (
                    <ProductCardSkeleton key={`skeleton-${index}`} viewMode={viewMode} />
                ))}
            </div>
            <PaginationSkeleton />
        </div>
    );
};

export const ProductsLoadingOverlay: React.FC = () => (
    <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-10">
        <div className="text-center">
            <div className="flex justify-center mb-4">
                {[...Array(3)].map((_, i) => (
                    <Skeleton
                        key={i}
                        variant="circular"
                        width={12}
                        height={12}
                        className="mx-1 animate-pulse"
                        style={{ animationDelay: `${i * 0.2}s`, animationDuration: "1s" }}
                    />
                ))}
            </div>
            <Typography variant="body2" className="text-gray-600 dark:text-gray-300">
                Loading...
            </Typography>
        </div>
    </div>
);

export const ProductsRefreshSkeleton: React.FC<{ viewMode: "grid" | "list" }> = ({ viewMode }) => (
    <div className={`grid ${viewMode === "list" ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"} gap-6`}>
        {Array.from({ length: 4 }).map((_, index) => (
            <Card key={`refresh-skeleton-${index}`} className="opacity-50 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                <CardContent className="p-4">
                    <Skeleton variant="text" width="80%" height={24} className="mb-2 animate-pulse" />
                    <Skeleton variant="text" width="60%" height={20} className="mb-2 animate-pulse" />
                    <Skeleton variant="text" width="40%" height={28} className="animate-pulse" />
                </CardContent>
            </Card>
        ))}
    </div>
);

export default ProductsSkeleton;