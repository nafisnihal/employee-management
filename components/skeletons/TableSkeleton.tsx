import { Avatar, AvatarFallback } from "../ui/avatar";
import { TableCell, TableRow } from "../ui/table";

export default function TableSkeleton() {
  return (
    <TableRow>
      <TableCell>
        <Avatar className="w-10 h-10 ml-5">
          <AvatarFallback />
        </Avatar>
      </TableCell>
      <TableCell>
        <div className="w-20 h-4 bg-muted/50 animate-pulse rounded-lg"></div>
      </TableCell>
      <TableCell>
        <div className="w-20 h-4 bg-muted/50 animate-pulse rounded-lg"></div>
      </TableCell>
      <TableCell>
        <div className="w-20 h-4 bg-muted/50 animate-pulse rounded-lg"></div>
      </TableCell>
      <TableCell>
        <div className="w-20 h-4 bg-muted/50 animate-pulse rounded-lg"></div>
      </TableCell>
      <TableCell className="flex items-center justify-center gap-3">
        <div className="w-10 h-10 bg-muted/50 animate-pulse rounded-lg"></div>
        <div className="w-10 h-10 bg-muted/50 animate-pulse rounded-lg"></div>
      </TableCell>
    </TableRow>
  );
}
