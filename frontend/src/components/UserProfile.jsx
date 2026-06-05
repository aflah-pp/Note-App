import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import api from "../api/axios";
import Modal from "../components/modal";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [profileMeta, setProfileMeta] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});

  const showModal = ({ title, statusCode, message, responseData, type }) => {
    setModalData({
      title,
      statusCode,
      message,
      responseData,
      type,
    });

    setModalOpen(true);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/api/me/");

      setUser(res.data.data);

      setProfileMeta({
        success: res.data.success,
        status_code: res.data.status_code,
        last_login_count: res.data.last_login_count,
      });

      showModal({
        title: "Profile Response",
        statusCode: res.data.status_code,
        message: res.data.message,
        responseData: res.data,
        type: res.data.success ? "success" : "warning",
      });
    } catch (err) {
      showModal({
        title: "Profile Fetch Failed",
        statusCode: err.response?.status || 500,
        message: err.response?.data?.detail || "Unable to fetch profile.",
        responseData: err.response?.data,
        type: "error",
      });
    }
  };

  if (!user) {
    return (
      <div className="max-w-4xl p-6 mx-auto">
        <div className="p-6 bg-white shadow-md rounded-xl">
          Loading profile...
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-4xl p-6 mx-auto">
        <button
          onClick={() => navigate("/")}
          className="mb-4 text-sm font-medium text-blue-600 transition hover:text-blue-800"
        >
          ← Back to Home
        </button>

        <h1 className="mb-6 text-3xl font-bold text-gray-800">My Profile</h1>
        <div className="overflow-hidden bg-white shadow-md rounded-xl">
          <div className="px-6 py-8 text-white bg-blue-600">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-20 h-20 text-3xl font-bold text-blue-600 bg-white rounded-full">
                {user.username?.charAt(0)?.toUpperCase()}
              </div>

              <div>
                <h2 className="text-2xl font-semibold">
                  {user.first_name} {user.last_name}
                </h2>

                <p className="text-blue-100">@{user.username}</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="text-sm text-gray-500">Username</label>

                <div className="p-3 mt-1 border rounded-lg bg-gray-50">
                  {user.email}
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-500">Email</label>

                <div className="p-3 mt-1 border rounded-lg bg-gray-50">
                  {user.username}
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-500">First Name</label>

                <div className="p-3 mt-1 border rounded-lg bg-gray-50">
                  {user.first_name}
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-500">Last Name</label>

                <div className="p-3 mt-1 border rounded-lg bg-gray-50">
                  {user.last_name}
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-500">
                  Last Login Count
                </label>

                <div className="p-3 mt-1 border rounded-lg bg-gray-50">
                  {profileMeta?.last_login_count}
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-500">Profile Status</label>

                <div className="p-3 mt-1 font-semibold text-orange-600 border rounded-lg bg-gray-50">
                  {profileMeta?.status_code}
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="text-sm text-gray-500">Notes Created</label>

                <div className="p-3 mt-1 font-semibold text-blue-600 border rounded-lg bg-gray-50">
                  {(user.notes_count || 0) + 19}
                </div>
              </div>
            </div>

            <div className="grid gap-4 mt-6 md:grid-cols-3">
              <div className="p-4 border rounded-lg">
                <p className="text-xs text-gray-500">Success Flag</p>

                <p className="font-semibold">{String(profileMeta?.success)}</p>
              </div>

              <div className="p-4 border rounded-lg">
                <p className="text-xs text-gray-500">Response Code</p>

                <p className="font-semibold text-orange-600">
                  {profileMeta?.status_code}
                </p>
              </div>

              <div className="p-4 border rounded-lg">
                <p className="text-xs text-gray-500">Login Counter</p>

                <p className="font-semibold">{profileMeta?.last_login_count}</p>
              </div>
            </div>

            <div className="p-4 mt-6 border border-yellow-200 rounded-lg bg-yellow-50">
              <p className="text-sm text-yellow-800">
                Profile loaded successfully.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalData.title}
        statusCode={modalData.statusCode}
        message={modalData.message}
        responseData={modalData.responseData}
        type={modalData.type}
      />
    </>
  );
}

export default Profile;
