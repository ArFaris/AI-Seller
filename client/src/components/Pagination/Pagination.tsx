import ButtonRight from './components/ButtonRight';
import ButtonLeft from './components/ButtonLeft';
import Button from 'components/Button';
import s from './Pagination.module.scss';

type PaginationProps = {
    total: number;
    limit: number;
    currentPage: number;
    setPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
    total, 
    limit,
    currentPage,
    setPage
}: PaginationProps) => {
    const pagesCount = Math.ceil(total / limit);
    const isLeftDisabled = currentPage === 1;
    const isRightDisabled = currentPage === pagesCount;

    if (pagesCount <= 1) return null;

    const handleChangePage = (newPage: number) => {
        if (newPage < 1 || newPage > pagesCount) return;
        setPage(newPage);
    };

    return (
        <div className={s.pagination}>
            <ButtonLeft view='pagination' disabled={isLeftDisabled} onClick={() => handleChangePage(currentPage - 1)}/>
            {
                Array(pagesCount).fill(0).map((_, n) => <Button data-selected={currentPage === n + 1} key={`page-${n+1}`} view='pagination' onClick={() => handleChangePage(n + 1)}>{n + 1}</Button>)
            }
            <ButtonRight view='pagination' disabled={isRightDisabled} onClick={() => handleChangePage(currentPage + 1)}/>
        </div>
    );
}

export default Pagination;
