import Swal from "sweetalert2";
import { IoPower } from "react-icons/io5";
import { motion } from "framer-motion";

import { getAuth, signOut } from "firebase/auth";

const LogoutButton = ({ setIsAuthenticated, text = "Log out", Icon = IoPower }) => {
  const handleLogout = () => {
    const auth = getAuth();

    signOut(auth)
      .then(() => {
        Swal.fire({
          icon: "question",
          title: "Logging Out",
          text: "Are you sure you want to log out?",
          showCancelButton: true,
          confirmButtonText: "Yes",
        }).then((result) => {
          if (result.value) {
            Swal.fire({
              timer: 1500,
              showConfirmButton: false,
              willOpen: () => {
                Swal.showLoading();
              },
              willClose: () => {
                setIsAuthenticated(false);
              },
            });
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <motion.button
      onClick={handleLogout}
      className="bg-slate-200 flex items-center gap-2 px-5 py-2.5 cursor-pointer rounded-lg shadow-2xl inset-shadow-sm"
      whileHover={{ y: -3 }}
      transition={{ duration: 0.3 }}
    >
      <Icon size={16} />
      <span className="text-sm font-medium">{text}</span>
    </motion.button>
  );
};

export default LogoutButton;
