import React, { useState,  useEffect, useRef, } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";

import { doc, setDoc } from "firebase/firestore"; 
import { db } from "../../services/firebase";

const EditStudentModal = ({isOpen, onClose, employees, selectedStudent, setEmployees, getEmployees}) => {

    // const id = selectedStudent.id;

    // const [firstName, setFirstName] = useState(selectedStudent.firstName);
    // const [lastName, setLastName] = useState(selectedStudent.firstName);
    // const [address, setAddress] = useState(selectedStudent.firstName);
    // const [contactNumber, setContactNumber] = useState(selectedStudent.firstName);

    const id = selectedStudent?.id || "";

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [contactNumber, setContactNumber] = useState("");    
    
    const firstNameRef = useRef(null);

    useEffect(() => {
        if(isOpen && firstNameRef.current) {
            firstNameRef.current.focus();
        }
    }, [isOpen])

    useEffect(() => {
      if (selectedStudent) {
        setFirstName(selectedStudent.firstName || "");
        setLastName(selectedStudent.lastName || "");
        setAddress(selectedStudent.address || "");
        setContactNumber(selectedStudent.contactNumber || "");
      }
    }, [selectedStudent]);

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (
            !firstName.trim() ||
            !lastName.trim() ||
            !address.trim() ||
            !contactNumber.trim()
          ) {
            return Swal.fire({
              icon: "error",
              title: "Error!",
              text: "All fields are required and cannot be empty.",
              showConfirmButton: true,
              customClass: {
                popup: "swal-popup",
                title: "swal-title",
                htmlContainer: "swal-text",
                icon: "swal-icon",
                confirmButton: "swal-confirm",
              },
              didOpen: () => {
                const popup = document.querySelector(".swal-popup");
                const title = document.querySelector(".swal-title");
                const text = document.querySelector(".swal-text");
                const icon = document.querySelector(".swal-icon");
        
                if (popup) {
                  popup.style.padding = "15px";
                  popup.style.maxWidth = "350px";
                }
                if (icon) {
                  icon.style.margin = "10px auto -30px auto";
                }
                if (title) {
                  title.style.marginBottom = "6px";
                  title.style.fontSize = "1.8rem";
                }
                if (text) {
                  text.style.marginBottom = "10px";
                  text.style.fontSize = "1.2rem";
                }
        
                const confirmBtn = document.querySelector(".swal-confirm");
        
                if (confirmBtn) {
                  confirmBtn.style.backgroundColor = "#7A3200";
                  confirmBtn.style.color = "white";
                  confirmBtn.style.border = "none";
                  confirmBtn.style.padding = "13px 16px";
                  confirmBtn.style.borderRadius = "6px";
                  confirmBtn.style.transition = "background-color 0.2s";
                }
        
                const style = document.createElement("style");
                style.innerHTML = `
                .swal-confirm:hover {
                  background-color: #7A3200 !important;
                }
              `;
                document.head.appendChild(style);
              },
            });
          }
          
          const trimmedFirstName = firstName.trim();
          const trimmedLastName = lastName.trim();
          const trimmedAddress = address.trim();
          const trimmedContactNumber = contactNumber.trim();
          
          const contactNumberPattern = /^[0-9]{11}$/;
          if (!contactNumberPattern.test(trimmedContactNumber)) {
            if (/\D/.test(trimmedContactNumber)) {
              return Swal.fire({
                icon: "error",
                title: "Invalid Contact Number",
                text: "Contact number must only contain numbers.",
              });
            } else {
              return Swal.fire({
                icon: "error",
                title: "Invalid Contact Number",
                text: "Contact number must be exactly 11 digits.",
              });
            }
          }

        const newEmployee = {
            id: id,
            firstName: trimmedFirstName,
            lastName: trimmedLastName,
            address: trimmedAddress,
            contactNumber: trimmedContactNumber,
        }

        try {
            await setDoc(doc(db, "employees", id), {
                ...newEmployee
            })
        } catch (error) {
            console.log(error)
        }

        setEmployees(employees);
        onClose();

        setFirstName('');
        setLastName('');
        setAddress('');
        setContactNumber('');

        getEmployees();

        Swal.fire({
            icon: 'success',
            title: 'Student updated successfully!',
            text: `${firstName} ${lastName}'s data has been updated.`,
            showConfirmButton: true,
            
            customClass: {
                popup: "swal-popup",
                title: "swal-title",
                htmlContainer: "swal-text",
                icon: "swal-icon",
                confirmButton: "swal-confirm",
              },
              didOpen: () => {
                const popup = document.querySelector(".swal-popup");
                const title = document.querySelector(".swal-title");
                const text = document.querySelector(".swal-text");
                const icon = document.querySelector(".swal-icon");
        
                if (popup) {
                  popup.style.padding = "15px";
                  popup.style.maxWidth = "350px";
                }
                if (icon) {
                  icon.style.margin = "10px auto -30px auto";
                }
                if (title) {
                  title.style.marginBottom = "6px";
                  title.style.fontSize = "1.8rem";
                }
                if (text) {
                  text.style.marginBottom = "10px";
                  text.style.fontSize = "1.2rem";
                }
        
                const confirmBtn = document.querySelector(".swal-confirm");
        
                if (confirmBtn) {
                  confirmBtn.style.backgroundColor = "#004332";
                  confirmBtn.style.color = "white";
                  confirmBtn.style.border = "none";
                  confirmBtn.style.padding = "13px 16px";
                  confirmBtn.style.borderRadius = "6px";
                  confirmBtn.style.transition = "background-color 0.2s";
                }
        
                const style = document.createElement("style");
                style.innerHTML = `
                .swal-confirm:hover {
                  background-color: #004332 !important;
                }
              `;
                document.head.appendChild(style);
              },
        })
    }

  return (
    <AnimatePresence>
    {isOpen && (
      <>
        {/* Backdrop */}
        <motion.div
        className="fixed inset-0 z-40 bg-[rgba(0,0,0,0.30)] "
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.30)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          className="fixed z-50 top-1/2 left-1/2 w-[90%] max-w-md bg-white rounded-2xl p-6 shadow-lg"
          initial={{ opacity: 0, scale: 0.8, y: "-50%", x: "-50%" }}
          animate={{ opacity: 1, scale: 1, y: "-50%", x: "-50%" }}
          exit={{ opacity: 0, scale: 0.8, y: "-50%", x: "-50%" }}
        >
          <h2 className="text-xl font-bold mb-4">Edit Student</h2>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleUpdate}>
            <input
                id="firstName"
              type="text"
              placeholder="First Name"
              className="w-full px-4 py-2 border rounded-md"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              ref={firstNameRef}
            />
            <input
              id="lastName"
              type="text"
              placeholder="Last Name"
              className="w-full px-4 py-2 border rounded-md"
              value={lastName}
              onChange={e => setLastName(e.target.value)}              
            />
            <input
            id="address"
              type="text"
              placeholder="Address"
              className="w-full px-4 py-2 border rounded-md"
              value={address}
              onChange={e => setAddress(e.target.value)}
            />
            <input
              type="text"
              placeholder="Contact Number"
              className="w-full px-4 py-2 border rounded-md"
              id="contactNumber"
              value={contactNumber}
              onChange={e => setContactNumber(e.target.value)}
            />

            <div className="flex justify-end mt-6 gap-2">
                <button type="submit">
                    Add
                </button>
              <button
                type="button"   
                onClick={onClose}
                className="muted-button button"
              >
                Close
              </button>
            </div>
          </form>
        </motion.div>
      </>
    )}
  </AnimatePresence>
  )
}

export default EditStudentModal