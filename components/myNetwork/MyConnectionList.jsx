import { useQuery } from "@apollo/client";
import Avatar from "@mui/material/Avatar";
import { Button } from "@mui/material";
import Image from "next/image";
import ConnectionsIcon from "../../public/icons/MessagesIconcopy.svg";
import styles from "../../styles/Navbar.module.css";
import toast from "react-hot-toast";
import Link from "@mui/material/Link";
import { useRouter } from "next/router";
import { PulseLoader } from "react-spinners";

import { GET_CONNECTED_USERS } from "../../graphql/operations/myNetwork";
import { formatWideAddress } from "../../util/addresssUtils";

function MyConnectionList() {
  const router = useRouter();
  const { data, loading, error } = useQuery(GET_CONNECTED_USERS);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "20vh",
          width: "100%",
        }}
      >
        <PulseLoader color="#2E603A" />
      </div>
    );
  } else if (error) {
    toast.error("An error occurred while loading connected users.");
    return <p>Error Loading Connected Users</p>;
  }

  if (data?.getConnectedUsers?.length === 0) {
    return (
      <div
        style={{
          color: "#e5e5e5",
          marginLeft: "3rem",
          marginTop: "5px",
          marginBottom: "1rem",
          display: "flex",
          justifyContent: "left",
          alignItems: "left",
          fontSize: "14px",
        }}
      >
        <p>No Connected Users</p>
      </div>
    );
  }
  return (
    <>
      {data &&
        data?.getConnectedUsers?.map((user) => (
          <div key={user._id} className={styles.list}>
            <div className={styles.profilename}>
              <div>
                <Avatar
                  sx={{ width: "32px", height: "32px" }}
                  alt={user.username}
                  src={user.profile_pic}
                />
                {/* <Avatar sx={{ width: '30', height: 'auto'}} alt={user.username}>
                  <Image src={default_profile} alt={user.username} width={30} height={30}/>
              </Avatar> */}
              </div>
              <div className={styles.details}>
                <Link
                  className={styles.searchLink}
                  onClick={() => {
                    router.push(`/Find/${user._id}`);
                  }}
                >
                  <h2>{user.username}</h2>
                </Link>
                <p
                  className={styles.title}
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "100px",
                  }}
                >
                  {formatWideAddress(user.address)}
                </p>
              </div>
            </div>
            <div className={styles.messageactions}>
              <Button
                className={styles.messageactionsBtn}
                onClick={() => {
                  router.push(`/Chats?userId=${user._id}`);
                }}
                style={{
                  backgroundColor: "white",
                  boxShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.1)",
                  color: "#2E603A",
                  display: "flex",
                  alignItems: "center",
                  padding: "15px",
                  borderRadius: "6px",
                }}
              >
                <div
                  style={{
                    width: "18px",
                    height: "18px",
                    position: "relative",
                  }}
                >
                  <Image
                    src={ConnectionsIcon}
                    alt="Message"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <p
                  style={{
                    color: "#2E603A",
                    marginLeft: 4,
                    fontWeight: "bold",
                    fontSize: "13px",
                  }}
                >
                  Chat
                </p>
              </Button>
            </div>
          </div>
        ))}
    </>
  );
}

export default MyConnectionList;
