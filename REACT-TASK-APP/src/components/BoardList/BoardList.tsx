import React, { FC, useState } from "react";
import { useTypedSelector } from "../../hooks/redux";
import SideForm from "./SideForm/SideForm";
import { FiPlusCircle } from "react-icons/fi";

type TBoardListProps = {
    activeBoardId: string;
    setActiveBoardId: React.Dispatch<React.SetStateAction<string>>;
};

const BoardList: FC<TBoardListProps> = ({ activeBoardId, setActiveBoardId }) => {
    const boardArray = useTypedSelector((state) => state.boards.boardArray);
    const [isFormOpen, setIsFormOpen] = useState(false);

    return (
        <div>
            <div>게시판:</div>
            {boardArray.map((board, index) => (
                <div key={board.boardId}>
                    <div>{board.boardName}</div>
                </div>
            ))}
            <div>
                {isFormOpen ? (
                    <SideForm setIsFormOpen={setIsFormOpen} />
                ) : (
                    <FiPlusCircle onClick={() => setIsFormOpen(!isFormOpen)} />
                )}
            </div>
        </div>
    );
};

export default BoardList;
