import { Pagination, Box } from "@mui/material";
import React from "react";
import type { PaginationGlobalProps } from "../../interface";

const PaginationGlobal: React.FC<PaginationGlobalProps> = ({ page, pageCount, onChange }) => {
    if (pageCount <= 1) return null;

    return (
        <Box className="flex justify-center mt-6">
            <Pagination
                count={pageCount}
                page={page}
                onChange={(_, value) => onChange(value)}
                color="primary"
            />
        </Box>
    );
};

export default PaginationGlobal;
