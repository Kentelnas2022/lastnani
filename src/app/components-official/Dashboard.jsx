import { useState } from "react";
import { Dialog } from "@headlessui/react";

export default function Dashboard() {
  const [openModal, setOpenModal] = useState(null);

  const cards = [
    {
      id: "collections",
      title: "Total Collections Today",
      value: "24",
      subtitle: "+12% vs yesterday",
      color: "blue",
      icon: "fas fa-trash-alt",
      details: "Today’s waste collections reached 24 pickups, showing an increase compared to yesterday’s activity.",
    },
    {
      id: "compliance",
      title: "Compliance Rate",
      value: "4.7/5",
      subtitle: "+5% this month",
      color: "green",
      icon: "fas fa-check-circle",
      details: "The compliance rate improved this month, indicating better participation from households.",
    },
    {
      id: "reports",
      title: "Pending Reports",
      value: "7",
      subtitle: "Needs attention",
      color: "yellow",
      icon: "fas fa-info-circle",
      details: "There are 7 pending citizen reports that require review and response.",
    },
    {
      id: "routes",
      title: "Active Routes",
      value: "5",
      subtitle: "All operational",
      color: "purple",
      icon: "fas fa-map-marker-alt",
      details: "All 5 collection routes are operational today, ensuring complete coverage.",
    },
  ];

  return (
    <section className="tab-content active space-y-8">
      {/* Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => setOpenModal(card)}
            className="relative bg-white rounded-2xl shadow-md p-5 overflow-hidden hover:shadow-xl transition cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">{card.title}</p>
                <h2 className={`text-3xl font-bold text-${card.color}-600 mt-2`}>
                  {card.value}
                </h2>
                <p
                  className={`text-${card.color}-500 text-xs font-medium mt-1`}
                >
                  {card.subtitle}
                </p>
              </div>
              <div
                className={`bg-${card.color}-100 rounded-xl p-3 text-${card.color}-600`}
              >
                <i className={`${card.icon} text-xl`}></i>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Activities and Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activities */}
        <div className="glass-card bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Recent Activities
          </h3>
          <div className="space-y-4">
            <div className="flex items-start bg-green-50 p-3 rounded-xl">
              <div className="text-green-500 mr-3">
                <i className="fas fa-leaf"></i>
              </div>
              <div>
                <p className="font-medium text-gray-700">
                  Content published: Composting at Home
                </p>
                <span className="text-sm text-gray-500">Just now</span>
              </div>
            </div>
            <div className="flex items-start bg-green-50 p-3 rounded-xl">
              <div className="text-green-500 mr-3">
                <i className="fas fa-check-circle"></i>
              </div>
              <div>
                <p className="font-medium text-gray-700">
                  Route A completed successfully
                </p>
                <span className="text-sm text-gray-500">2 minutes ago</span>
              </div>
            </div>
            <div className="flex items-start bg-blue-50 p-3 rounded-xl">
              <div className="text-blue-500 mr-3">
                <i className="fas fa-sms"></i>
              </div>
              <div>
                <p className="font-medium text-gray-700">
                  SMS alert sent to 150 residents
                </p>
                <span className="text-sm text-gray-500">15 minutes ago</span>
              </div>
            </div>
            <div className="flex items-start bg-yellow-50 p-3 rounded-xl">
              <div className="text-yellow-500 mr-3">
                <i className="fas fa-file-alt"></i>
              </div>
              <div>
                <p className="font-medium text-gray-700">
                  New citizen report received
                </p>
                <span className="text-sm text-gray-500">1 hour ago</span>
              </div>
            </div>
          </div>
        </div>

        {/* Efficiency Chart */}
        <div className="glass-card bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Collection Efficiency
          </h3>
          <div className="h-52 bg-gray-50 rounded-xl flex items-center justify-center">
            {/* Replace with Chart.js */}
            <span className="text-gray-400">Chart Placeholder</span>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Dialog
        open={!!openModal}
        onClose={() => setOpenModal(null)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            {openModal && (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-800">
                    {openModal.title}
                  </h2>
                  <button
                    onClick={() => setOpenModal(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✖
                  </button>
                </div>
                <div className="text-gray-700 space-y-2">
                  <p className="text-3xl font-bold text-blue-600">
                    {openModal.value}
                  </p>
                  <p className="text-sm">{openModal.details}</p>
                  <p className="text-xs text-gray-500">
                    Status: {openModal.subtitle}
                  </p>
                </div>
              </>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>
    </section>
  );
}
