import MultiDropdown from "components/MultiDropdown";
import Text from 'components/Text';
import s from './Filter.module.scss';
import Button from "components/Button";
import { CATEGORY_OPTIONS } from "consts/categories";
import { type Option } from 'types/dropdown';
import Switch from 'components/Switch';

type FilterProps = {
    selectedCategories: Option[],
    setSelectedCategories: React.Dispatch<React.SetStateAction<Option[]>>;
    onlyNeedsRevision: boolean;
    setOnlyNeedsRevision: React.Dispatch<React.SetStateAction<boolean>>; 
}

const Filter: React.FC<FilterProps> = ({
    selectedCategories, 
    setSelectedCategories, 
    onlyNeedsRevision, 
    setOnlyNeedsRevision
}: FilterProps) => {

    const getTitle = (options: Option[]) => {
        return options.map(option => option.value).join(', ') || 'Категория';
    }

    const resetFilter = () => {
        setSelectedCategories([]);
        setOnlyNeedsRevision(false);
    }

    return (
        <aside className={s.wrapper}>
            <div className={s.filter}>
                <Text view='p-16' className={s.title}>Фильтры</Text>

                <MultiDropdown className={s.dropdown} options={Object.values(CATEGORY_OPTIONS)} value={selectedCategories} onChange={(categories) => setSelectedCategories(categories)} getTitle={getTitle} />

                <div className={s.line}></div>


                <Switch checked={onlyNeedsRevision} onChange={() => setOnlyNeedsRevision(prev => !prev)} label='Только требующие доработок'/>
            </div>

            <Button view='filter' className={s.button} onClick={resetFilter}>Сбросить фильтры</Button>
        </aside>
    )
}

export default Filter;
