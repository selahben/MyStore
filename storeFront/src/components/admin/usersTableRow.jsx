import { useEffect, useState } from "react";
import { useStoreContext } from "../../context/store.context";
import { toast } from "react-toastify";

export function UsersTableRow({ user }) {
  const {
    setUserToEdit,
    setModalFormType,
    changeUserAdminStatus,
    signedIn,
    getUsers,
  } = useStoreContext();

  //Opening the edit user modal
  function setEditUser() {
    setModalFormType("editUser");
    setUserToEdit(user);
  }

  //Handling status change
  async function handleAdminStatus(newStatus) {
    try {
      await changeUserAdminStatus(user._id, newStatus);
      await getUsers();
    } catch (err) {
      toast.error(err);
    }
  }

  return (
    <tr>
      <td className="adminUserTD adminUserImg">
        <img src={user.image.url} alt={user.image.alt} />
      </td>
      <td className="adminUserTD adminUserName">{user.name}</td>
      <td className="adminUserTD adminUserEmail">{user.email}</td>
      <td className="adminUserTD adminUserPhone">{user.phone}</td>
      <td className="adminUserTD adminUserPhone">{user.address.state}</td>
      <td className="adminUserTD adminUserPhone">{user.address.country}</td>
      <td className="adminUserTD adminUserPhone">{user.address.city}</td>
      <td className="adminUserTD adminUserIsAdmin">
        <input
          type="checkbox"
          id="isAdmin"
          name="isAdmin"
          checked={user.isAdmin}
          disabled={signedIn.id === user._id ? true : false}
          onChange={(e) => handleAdminStatus(e.target.checked)}
        />
      </td>
      <td className="adminUserTD adminUserEdit text-center">
        <button className="btn editBTN btn-primary pb-0" onClick={setEditUser}>
          <i className="bi bi-pencil-square"></i>
        </button>
      </td>
    </tr>
  );
}
