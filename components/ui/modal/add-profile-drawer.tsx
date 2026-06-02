"use client";

import * as React from "react";
import { Modal, ModalHeader, ModalTitle, ModalContent, ModalFooter } from "./modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { FaCalendarAlt } from "react-icons/fa";

export interface AddProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate?: (data: {
    firstName: string;
    lastName: string;
    email: string;
    joinDate: string;
    role: string;
  }) => void;
}

export function AddProfileDrawer({ isOpen, onClose, onCreate }: AddProfileDrawerProps) {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [selectedDate, setSelectedDate] = React.useState("");
  const [role, setRole] = React.useState("UI/UX Designer");
  const [showDatePicker, setShowDatePicker] = React.useState(false);

  React.useEffect(() => {
    if (isOpen) {
      setFirstName("");
      setLastName("");
      setEmail("");
      setSelectedDate("");
      setRole("UI/UX Designer");
      setShowDatePicker(false);
    }
  }, [isOpen]);

  const handleCreate = () => {
    if (!firstName.trim() || !lastName.trim() || !email.trim()) return;

    onCreate?.({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      joinDate: selectedDate,
      role,
    });

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} position="right">
      <ModalHeader onClose={onClose}>
        <ModalTitle>Add New User</ModalTitle>
      </ModalHeader>
      <ModalContent className="flex flex-col gap-6">
        <Input
          label="First Name"
          placeholder="First Name"
          required
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <Input
          label="Last Name"
          placeholder="Last Name"
          required
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <Input
          label="Email Address"
          placeholder="Email Address"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="relative">
          <Input
            label="Join Date"
            value={selectedDate}
            readOnly
            onClick={() => setShowDatePicker(!showDatePicker)}
            rightIcon={<FaCalendarAlt className="text-gray-400 cursor-pointer" />}
            required
            placeholder="Select a date"
          />
          {showDatePicker && (
            <div className="absolute right-0 bottom-full mb-2 z-50 shadow-2xl">
              <Calendar
                onSelect={(date) => {
                  const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "short", year: "numeric" };
                  setSelectedDate(date.toLocaleDateString("en-GB", options));
                  setShowDatePicker(false);
                }}
                onClose={() => setShowDatePicker(false)}
              />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-body-sm font-bold text-gray-900 dark:text-white">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full h-12 px-4 rounded-xl text-body-md bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-white outline-none focus:border-primary"
          >
            <option>UI/UX Designer</option>
            <option>Frontend Engineer</option>
            <option>Product Manager</option>
          </select>
        </div>
      </ModalContent>
      <ModalFooter>
        <Button variant="outline" className="flex-1 justify-center" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="primary"
          className="flex-1 justify-center"
          onClick={handleCreate}
          disabled={!firstName.trim() || !lastName.trim() || !email.trim()}
        >
          Create
        </Button>
      </ModalFooter>
    </Modal>
  );
}
