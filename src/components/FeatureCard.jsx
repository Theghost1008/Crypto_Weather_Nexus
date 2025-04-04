const FeatureCard = ({ title, description, icon }) => (
    <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition dark:bg-gray-800 text-center">
      <div className="text-4xl">{icon}</div>
      <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
      <p className="mt-2 text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
export default FeatureCard;