import React, { useState } from "react";

type CreatureType = {
  id: number;
  creatureType: string;
  inPlay: boolean;
};

const Container: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {children}
    </div>
  );
};

const Tasks: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <div>{children}</div>;
};

const TaskCount: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <span style={{ margin: 10 }}>{children}</span>;
};

const Button: React.FC<JSX.IntrinsicElements["button"]> = ({ children, onClick }) => {
  return (
    <button
      style={{
        display: "inline-block",
        flex: 1,
        outline: "none",
        border: "none",
        backgroundColor: "teal",
        color: "white",
        height: 30,
        width: 50,
        borderRadius: 2,
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const Text: React.FC<JSX.IntrinsicElements["input"]> = ({ value, onChange, onInput, onKeyDown }) => {
  return (
    <input
      style={{
        display: "inline-block",
        flex: 1,
        outline: "none",
        border: "2px solid black",
      }}
      value={value}
      onChange={onChange}
      onInput={onInput}
      onKeyDown={(e) => e.key === "Enter" && onKeyDown && onKeyDown(e)}
    />
  );
};

const CreatureType: React.FC<{ creature: CreatureType } & JSX.IntrinsicElements["li"]> = ({
  creature,
  children,
  onClick,
}) => {
  const { inPlay } = creature;
  return (
    <li
      style={{
        listStyle: "none",
        border: "1px solid gray",
        textDecoration: !inPlay ? "line-through" : "none",
      }}
      onClick={onClick}
    >
      {children}
    </li>
  );
};

const Journal: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [creatureTypesCount, setCreatureTypesCount] = useState<number>(0);
  const [creatureTypes, setCreatureTypes] = useState<CreatureType[]>([]);

  const handleClick = () => {
    if (input === "") {
      return;
    }
    const id = creatureTypes.length + 1;
    setCreatureTypes((prev) => [
      ...prev,
      {
        id: id,
        creatureType: input,
        inPlay: true,
      },
    ]);
    setCreatureTypesCount(id);
    setInput("");
  };

  const handleRemoveFromPlay = (id: number) => {
    const cts = creatureTypes.map((ct) => {
      return {
        ...ct,
        inPlay: ct.id === id ? !ct.inPlay : ct.inPlay,
      };
    });
    setCreatureTypes(cts);
  };

  const handleClear = () => {
    setCreatureTypes([]);
    setInput("");
    setCreatureTypesCount(0);
  };

  return (
    <Container>
      <div>
        <h2>Volo&apos;s Journal</h2>
        <Text value={input} onChange={(e) => setInput((e.target as HTMLInputElement).value)} onKeyDown={handleClick} />
        <Button onClick={handleClick}>Add</Button>
      </div>
      <Tasks>
        <TaskCount>
          <b>{creatureTypesCount}</b>
        </TaskCount>
      </Tasks>
      <div>
        <ul>
          {creatureTypes.map((ct) => (
            <CreatureType key={`creature-${ct.id}`} creature={ct} onClick={() => handleRemoveFromPlay(ct.id)}>
              {ct.creatureType}
            </CreatureType>
          ))}
        </ul>
      </div>
      <Button onClick={handleClear}>Clear</Button>
    </Container>
  );
};

export default Journal;
