import { useStoreContext } from "../../context/store.context";
import { UsersTableColTitle } from "./usersTableColTitle";
import { UsersTableRow } from "./usersTableRow";

export function UsersTable() {
  const { users } = useStoreContext();

  return (
    <div id="usersTableWrapper" className="table-responsive">
      <table id="usersTable" className="table table-bordered table-striped">
        <thead>
          <tr>
            <th scope="col"></th>
            <UsersTableColTitle title="name" sortable={true} />
            <UsersTableColTitle title="email" sortable={true} />
            <UsersTableColTitle title="phone" sortable={true} />
            <UsersTableColTitle title="state" sortable={true} />
            <UsersTableColTitle title="country" sortable={true} />
            <UsersTableColTitle title="city" sortable={true} />
            <th scope="col" className="text-center">
              isAdmin
            </th>
            <th scope="col" className="text-center">
              Edit \ Delete
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <UsersTableRow key={`user${index}`} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
