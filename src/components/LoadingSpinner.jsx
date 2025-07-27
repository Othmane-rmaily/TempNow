import { motion } from 'framer-motion';

function LoadingSpinner() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative w-20 h-20 mx-auto"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
        className="w-full h-full rounded-full border-4 border-blue-200/30 border-t-blue-500/80"
      />
    </motion.div>
  );
}

export default LoadingSpinner;
