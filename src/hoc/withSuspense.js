export const withSuspense = Component => {
  return props => {
    <Component {...props} />;
  };
};
