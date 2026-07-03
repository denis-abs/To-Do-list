import "../styles/components/FilterBar.css";

const FilterBar = (props) => {
    
    const {
        dateTask = '',
        statusFilter='all',
        onDateTask,
        onStatusFilter
    } = props;
    return (
        
        <div className="filter-bar">
            <select className="filter-select" value={statusFilter} onChange={(event) => onStatusFilter(event.target.value)}>
                <option value="all">Все задачи</option>
                <option value="completed">Выполненные</option>
                <option value="active">Невыполненные</option>
            </select>

            <input
                className="date-filter"
                type="date"

                value={dateTask}
                onChange={(event) => onDateTask(event.target.value)}
            />
        </div>

    );

};

export default FilterBar;