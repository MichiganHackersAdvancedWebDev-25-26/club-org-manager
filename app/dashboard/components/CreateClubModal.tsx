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
import { Textarea } from "@/components/ui/textarea";
import { createClub } from "../actions";
import { Plus } from "lucide-react";
import { useToast } from "@/components/ui/toast";

export function CreateClubModal() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { showToast } = useToast();

  const isFormValid = name.length >= 3 && description.length >= 25;

  const handleSubmit = async (formData: FormData) => {
    if (!isFormValid) {
      showToast(
        "Please fill in all required fields with valid content",
        "error"
      );
      return;
    }

    setIsLoading(true);

    try {
      const result = await createClub(formData);

      if (result.error) {
        showToast(result.error, "error");
      } else if (result.success) {
        showToast("Club created successfully!", "success");
        setOpen(false);
        // Reset form
        setName("");
        setDescription("");
        // Redirect to the new club's dashboard
        window.location.href = `/dashboard/${result.clubId}`;
      }
    } catch (error) {
      showToast("An unexpected error occurred", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Club
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Club</DialogTitle>
          <DialogDescription>
            Create a new club to start organizing events and managing members.
          </DialogDescription>
        </DialogHeader>
        <form id="create-club-form" action={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Club Name *</Label>
            <Input
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter club name"
              required
              minLength={3}
              disabled={isLoading}
            />
            <p className="text-sm text-muted-foreground">
              Must be at least 3 characters long and unique.
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your club's purpose and activities (minimum 25 characters)"
              rows={3}
              required
              minLength={25}
              disabled={isLoading}
            />
            <p className="text-sm text-muted-foreground">
              Must be at least 25 characters long. ({description.length}/25)
            </p>
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
            <Button type="submit" disabled={isLoading || !isFormValid}>
              {isLoading ? "Creating..." : "Create Club"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
