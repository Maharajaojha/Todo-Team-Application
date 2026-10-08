
import { useState } from 'react';
import './Style/todoform.css';

export const TodoForm = ({ onCancel, onSave }) => {

    // ================= FORM DATA =================

    const [formData, setFormData] = useState({
        title: "",
        priority: "",
        category: "",
        description: "",
        dueDate: "",
        dueTime: "",
        reminderOption: "",
        important: false,
        subtask: false,
        attachment: null
    });


    // ================= HANDLE INPUT CHANGE =================

    const handleChange = (e) => {

        const { name, value, type, checked, files } = e.target;

        setFormData({
            ...formData,

            [name]:
                type === "checkbox"
                    ? checked
                    : type === "file"
                    ? files[0]
                    : value
        });
    };


    // ================= HANDLE FORM SUBMIT =================

    const handleSubmit = (e) => {

        e.preventDefault();

        onSave?.({
            ...formData,
            title: formData.title.trim(),
            attachment: formData.attachment?.name ?? null,
            category: formData.category
                ? formData.category.charAt(0).toUpperCase() + formData.category.slice(1)
                : "Uncategorized",
            priority: formData.priority
                ? formData.priority.charAt(0).toUpperCase() + formData.priority.slice(1)
                : "Medium",
        });

    };


    return (
        <main className="todo-page">

            <div className="page-title">
                Add Task
            </div>


            {/* ================= FORM ================= */}

            <form
                className="addtaskForm"
                onSubmit={handleSubmit}
            >

                {/* ================= TASK TITLE ================= */}

                <div className="form-group full-width">

                    <label htmlFor="title">
                        Task Title
                    </label>

                    <input
                        type="text"
                        name="title"
                        id="title"
                        placeholder="E.g. Project Report"
                        required
                        value={formData.title}
                        onChange={handleChange}
                    />

                </div>


                {/* ================= PRIORITY ================= */}

                <div className="form-group">

                    <label htmlFor="priority">
                        Priority
                    </label>

                    <select
                        id="priority"
                        name="priority"
                        value={formData.priority}
                        onChange={handleChange}
                    >

                        <option value="">
                            Select Priority
                        </option>

                        <option value="low">
                            Low
                        </option>

                        <option value="medium">
                            Medium
                        </option>

                        <option value="high">
                            High
                        </option>

                    </select>

                </div>


                {/* ================= CATEGORY ================= */}

                <div className="form-group">

                    <label htmlFor="category">
                        Category
                    </label>

                    <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                    >

                        <option value="">
                            Select Category
                        </option>

                        <option value="work">
                            Work
                        </option>

                        <option value="personal">
                            Personal
                        </option>

                        <option value="study">
                            Study
                        </option>

                        <option value="shopping">
                            Shopping
                        </option>

                    </select>

                </div>


                {/* ================= DESCRIPTION ================= */}

                <div className="form-group full-width">

                    <label htmlFor="description">
                        Description
                    </label>

                    <textarea
                        id="description"
                        name="description"
                        placeholder="Add more details about the task..."
                        rows="5"
                        value={formData.description}
                        onChange={handleChange}
                    />

                </div>


                {/* ================= DUE DATE ================= */}

                <div className="form-group">

                    <label htmlFor="dueDate">
                        Due Date
                    </label>

                    <input
                        type="date"
                        id="dueDate"
                        name="dueDate"
                        value={formData.dueDate}
                        onChange={handleChange}
                    />

                </div>


                {/* ================= DUE TIME ================= */}

                <div className="form-group">

                    <label htmlFor="dueTime">
                        Due Time
                    </label>

                    <input
                        type="time"
                        id="dueTime"
                        name="dueTime"
                        value={formData.dueTime}
                        onChange={handleChange}
                    />

                </div>


                {/* ================= REMINDER ================= */}

                <div className="form-group full-width">

                    <label htmlFor="reminder">
                        Reminder
                    </label>

                    <select
                        name="reminderOption"
                        id="reminder"
                        value={formData.reminderOption}
                        onChange={handleChange}
                    >

                        <option value="">
                            Select reminder
                        </option>

                        <option value="none">
                            No reminder
                        </option>

                        <option value="5min">
                            5 minutes before
                        </option>

                        <option value="15min">
                            15 minutes before
                        </option>

                        <option value="30min">
                            30 minutes before
                        </option>

                        <option value="1hour">
                            1 hour before
                        </option>

                        <option value="1day">
                            1 day before
                        </option>

                    </select>

                </div>


                {/* ================= ADDITIONAL OPTIONS ================= */}

                <div className="additional-options full-width">

                    <h5>
                        Additional Options
                        <span>(Optional)</span>
                    </h5>


                    {/* Important */}

                    <label className="checkbox-option">

                        <input
                            type="checkbox"
                            name="important"
                            checked={formData.important}
                            onChange={handleChange}
                        />

                        <span>
                            Add to Important
                        </span>

                    </label>


                    {/* Subtask */}

                    <label className="checkbox-option">

                        <input
                            type="checkbox"
                            name="subtask"
                            checked={formData.subtask}
                            onChange={handleChange}
                        />

                        <span>
                            Create as Subtask
                        </span>

                    </label>


                    {/* Attachment */}

                    <div className="file-upload">

                        <label htmlFor="attachment">
                            Attachment
                        </label>

                        <input
                            type="file"
                            id="attachment"
                            name="attachment"
                            onChange={handleChange}
                        />

                    </div>

                </div>


                {/* ================= FORM ACTIONS ================= */}

                <div className="form-actions full-width">

                    <button
                        type="button"
                        className="cancel-btn"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>


                    <button
                        type="submit"
                        className="add-task-btn"
                    >
                        Add Task
                    </button>

                </div>

            </form>

        </main>
    );
};

