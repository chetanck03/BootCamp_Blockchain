import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AnnounceWinner from "../../components/ElectionCommission/AnnounceWinner";
import DisplayResult from "../../components/ElectionCommission/DisplayResult";
import EmergencyDeclare from "../../components/ElectionCommission/EmergencyDeclare";
import VotingStatus from "../../components/ElectionCommission/VotingStatus";
import VotingTimePeriod from "../../components/ElectionCommission/VotingTimePeriod";

const ElectionCommission = () => {
  const token = localStorage.getItem("token");
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!token) {
      navigateTo("/");
    }
  }, [navigateTo, token]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-4 py-8">
      <div className="max-w-4xl w-full space-y-8">
        {/* Voting Status */}
        <section className="p-6 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-blue-400 mb-4">Voting Status</h2>
          <VotingStatus />
        </section>

        {/* Display Results */}
        <section className="p-6 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-blue-400 mb-4">Display Results</h2>
          <DisplayResult />
        </section>

        {/* Voting Time Period */}
        <section className="p-6 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-blue-400 mb-4">Set Voting Time Period</h2>
          <VotingTimePeriod />
        </section>

        {/* Announce Winner */}
        <section className="p-6 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-blue-400 mb-4">Announce Winner</h2>
          <AnnounceWinner />
        </section>

        {/* Emergency Declare */}
        <section className="p-6 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-blue-400 mb-4">Emergency Declare</h2>
          <EmergencyDeclare />
        </section>
      </div>
    </div>
  );
};

export default ElectionCommission;
