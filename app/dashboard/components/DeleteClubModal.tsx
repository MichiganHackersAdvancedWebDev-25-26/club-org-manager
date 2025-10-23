"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { deleteClub } from "../actions";
import { Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/toast";

interface DeleteClubModalProps {
  clubId: string;
  clubName: string;
  onSuccess?: () => void;
}

export function DeleteClubModal({
  clubId,
  clubName,
  onSuccess,
}: DeleteClubModalProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmationText, setConfirmationText] = useState("");
  const { showToast } = useToast();

  const handleSubmit = async () => {
    if (confirmationText !== clubName) {
      showToast("Club name does not match", "error");
      return;
    }

    setIsLoading(true);

    try {
      const result = await deleteClub(clubId);

      if (result.error) {
        showToast(result.error, "error");
      } else if (result.success) {
        showToast("Club deleted successfully!", "success");
        setOpen(false);
        setConfirmationText("");
        onSuccess?.();
        // Redirect to dashboard
        window.location.href = "/dashboard";
      }
    } catch (error) {
      showToast("An unexpected error occurred", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!isLoading) {
      setOpen(newOpen);
      if (!newOpen) {
        setConfirmationText("");
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="destructive"
          size="sm"
          className="flex items-center gap-2"
        >
          <Trash2 className="h-4 w-4" />
          Delete Club
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-destructive">Delete Club</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the club
            and all associated data including events, announcements, and
            memberships.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="confirmation">
              Type <strong>{clubName}</strong> to confirm deletion:
            </Label>
            <Input
              id="confirmation"
              value={confirmationText}
              onChange={(e) => setConfirmationText(e.target.value)}
              placeholder={clubName}
              disabled={isLoading}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleSubmit}
            disabled={isLoading || confirmationText !== clubName}
          >
            {isLoading ? "Deleting..." : "Delete Club"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
