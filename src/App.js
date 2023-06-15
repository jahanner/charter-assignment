import "./App.css";
import React, { useEffect, useState } from "react";
import { users } from "./mockData";
import { calculateRewardsPoints, calculateTotals } from "./helpers";

function App() {
  const [userData, setUserData] = useState([]);
  const [apiCalled, setApiCalled] = useState(false);

  useEffect(() => {
    let res;
    // mock api call
    async function callApi() {
      await setTimeout(() => {
        res = users;
        setApiCalled(true);
        return res;
      }, 500);
    }
    callApi();
  }, []);

  useEffect(() => {
    if (apiCalled) {
      const calcTotalSpent = ({ moneySpent, id }) => {
        let totalRewardPoints = 0;
        let res = calculateTotals(moneySpent);
        let index = users.findIndex((x) => x.id === id);
        users[index].totalSpent = res.totalSpent;
        users[index].monthlyTotalSpent = res.monthlyTotalSpent;
        users[index].monthlyRewardPoints = calculateRewardsPoints(
          res.monthlyTotalSpent
        );
        users[index].monthlyRewardPoints.forEach((obj) => {
          totalRewardPoints += obj.points;
        });
        users[index].totalRewardPoints = totalRewardPoints;
      };
      if (users.length) {
        users.forEach((user) => {
          calcTotalSpent(user);
        });
        setUserData(users);
      }
    }
  }, [apiCalled]);

  useEffect(() => {}, [userData]);

  return (
    <div className="App">
      <header className="App-header">
        <div className="Users-list">
          {userData.length &&
            userData.map((user) => (
              <div className="User" key={user.id}>
                <div>
                  <span>Name:</span> {user.name}
                </div>
                <div>
                  <span>Total Money Spent:</span> ${user.totalSpent}
                </div>
                {user.monthlyRewardPoints.map((obj) => {
                  return (
                    <div>
                      <span>{obj.month} Points</span>: {obj.points}
                    </div>
                  );
                })}
                <div>
                  <span>Total Reward Points: </span>
                  {user.totalRewardPoints}
                </div>
              </div>
            ))}
        </div>
      </header>
    </div>
  );
}

export default App;
