import styles from "../styles/eom.module.css";
import { Toolbar } from "../component/Toolbar";

const eom = ({ employee }) => {
  console.log(employee);
  return (
    <div className="page-container">
      <Toolbar />
      <div className={styles.main}>
        <h1>Employee of the month</h1>

        <div className={styles.employeeOfTheMonth}>
          <img src={employee.avatar_url} alt="" />
          <h3>{employee.login}</h3>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async (pageContext) => {
  const apiResponse = await fetch(
    `https://api.github.com/users/amirrezaesmailzadeh`
  );
  const employee = await apiResponse.json();

  return {
    props: {
      employee,
    },
  };
};

export default eom;
