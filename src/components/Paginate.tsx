import {
  Pagination,
  PaginationContent,
//   PaginationEllipsis,
  PaginationItem,
//   PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import Button from "./ui/button/Button";

interface PaginateProps {
  pages: number;    
    currentPage: number;
    path?: string; // Base path for pagination links
    param?: string; // Query parameter for page number
}

export function Paginate({ pages, currentPage, path , param }: PaginateProps) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
         <PaginationPrevious
            href={currentPage > 1 ? path + '?page=' + (currentPage - 1) + '&search=' + param : '#'}
            isActive={currentPage > 1}
          /> 
          {/* <Button> Précédent </Button> */}
        </PaginationItem>
                <PaginationItem>
          {currentPage < pages ? (
            <PaginationNext href={path+'?page='+(currentPage+1)+'&search='+param} isActive={true} />
          ) : (
            <PaginationNext href="#" isActive={false} />
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
