import React from "react";
import { Card, CardContent, Skeleton } from "@mui/material";

const SkeletonCard: React.FC = () => {
  return (
    <Card className="relative shadow-none border border-line bg-offwhite">
      <Skeleton variant="rectangular" height={200} className="p-4" />
      <CardContent className="p-4">
        <Skeleton variant="text" data-testid="skeleton" width="80%" height={20} className="mb-2" />
        <Skeleton  variant="text" data-testid="skeleton" width="60%" height={20} />
      </CardContent>
    </Card>
  );
};

export default SkeletonCard;
