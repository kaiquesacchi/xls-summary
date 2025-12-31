export function Code(props: Props) {
  return (
    <pre
      style={{
        padding: "8px",
        backgroundColor: "#FFFFFF10",
        width: "fit-content",
      }}
    >
      {JSON.stringify(props.code, null, 2)}
    </pre>
  );
}

type Props = {
  code: unknown;
};
