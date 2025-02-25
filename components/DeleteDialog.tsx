import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

import { Dispatch, SetStateAction } from "react";

interface DeleteDialogProps {
  deleteDialogOpen: boolean;
  onDeleteDialogOpenChange: Dispatch<SetStateAction<boolean>>;
  handleDelete: () => void;
}

export default function DeleteDialog({
  deleteDialogOpen,
  onDeleteDialogOpenChange,
  handleDelete,
}: DeleteDialogProps) {
  return (
    <Dialog open={deleteDialogOpen} onOpenChange={onDeleteDialogOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
        </DialogHeader>
        <p>Are you sure you want to delete this employee?</p>
        <DialogFooter>
          <Button
            onClick={() => onDeleteDialogOpenChange(false)}
            className="cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            className="bg-red-500 text-white hover:bg-red-600 cursor-pointer"
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
