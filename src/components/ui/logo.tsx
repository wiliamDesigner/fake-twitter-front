type Props = {
  size?: number;
};

export const Logo = ({ size  }: Props) => {
  return (
    <a href="/">
      <img
        src="/logo.png"
        alt="FakeTwitter"
        width={size}
        height={size}
      />
    </a>
  );
};