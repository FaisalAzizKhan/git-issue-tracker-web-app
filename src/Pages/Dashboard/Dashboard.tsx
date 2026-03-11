// pages/Dashboard.tsx
import React from 'react';
import {
    MdAssignment,
    MdAssignmentTurnedIn,
    MdCalendarToday,
    MdFlightTakeoff,
    MdCheckCircle,
    MdAccountBalanceWallet,
    MdPerson,
    MdDescription,
    MdAccessTime
} from 'react-icons/md';

// Interface for a single dashboard card's properties
interface DashboardCardProps {
    icon: React.ElementType;
    iconBgColor: string;
    title: string;
    value: number;
    changePercentage: string;
    changeType: 'positive' | 'negative';
}

// Component for the "My Assigned Safaris" bar chart
const MyAssignedSafarisChart: React.FC = () => {
    const data = [50, 20, 10, 25, 45, 15, 35];
    const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    const maxVal = 60;
    const chartInnerHeight = 150; // Height of the area where bars will be drawn
    const chartPaddingTop = 0; // Adjusted padding to move graph higher
    const chartPaddingBottom = 30; // Padding from the bottom of the gradient div
    const negativeMarginTop = 48; // The absolute value of the negative margin

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col" style={{ height: 'fit-content' }}>
            {/* Chart div - moved to top with adjusted styles */}
            <div
                className="relative rounded-lg overflow-hidden flex flex-col mb-4"
                style={{
                    background: 'linear-gradient(213deg, #49A3F1 0%, #1A73E8 100%)',
                    boxShadow: '0px 7px 10px -5px #00BBD466, 0px 4px 20px 0px #00000024',
                    height: chartInnerHeight + chartPaddingTop + chartPaddingBottom + negativeMarginTop,
                    marginTop: `-${negativeMarginTop}px`, // Move the entire chart container up
                }}
            >
                {/* Y-axis labels and horizontal grid lines */}
                {[0, 20, 40, 60].map((label, index) => (
                    <React.Fragment key={`y-axis-${label}`}>
                        <span
                            className="absolute text-white text-xs font-medium opacity-80"
                            style={{
                                left: '12px',
                                // Position labels from the top, aligning 0 with the bottom of the chart area
                                top: `${chartPaddingTop + chartInnerHeight - (label / maxVal) * chartInnerHeight - (label === 0 ? 0 : 4) + negativeMarginTop}px`, // Adjusted for new paddingTop and 0 alignment
                                transform: label === 0 ? 'translateY(0%)' : 'translateY(50%)', // No vertical transform for 0
                                zIndex: 2,
                            }}
                        >
                            {label}
                        </span>
                        {/* Render grid lines for all labels, including 0 if desired, but for visual separation, often start from the next major tick */}
                        {label !== 0 && (
                            <div
                                className="absolute left-0 right-0 bg-white opacity-20"
                                style={{
                                    // Position grid lines from the top, considering chartPaddingTop
                                    top: `${chartPaddingTop + chartInnerHeight - (label / maxVal) * chartInnerHeight + negativeMarginTop}px`,
                                    height: '1px',
                                    width: '100%',
                                    zIndex: 1,
                                }}
                            ></div>
                        )}
                        {label === 0 && (
                            <div
                                className="absolute left-0 right-0 bg-white opacity-40" // Slightly more opaque for the 0 line
                                style={{
                                    top: `${chartPaddingTop + chartInnerHeight + negativeMarginTop}px`,
                                    height: '1px',
                                    width: '100%',
                                    zIndex: 1,
                                }}
                            ></div>
                        )}
                    </React.Fragment>
                ))}

                {/* Vertical lines */}
                {days.map((_, index) => (
                    <div
                        key={`vertical-line-${index}`}
                        className="absolute bg-white opacity-10"
                        style={{
                            left: `calc(48px + ${index * (100 / days.length)}% - 5px)`, // Adjust for paddingLeft and half bar width
                            top: `${chartPaddingTop + negativeMarginTop}px`,
                            height: `${chartInnerHeight}px`,
                            width: '1px',
                            zIndex: 1,
                        }}
                    ></div>
                ))}


                {/* Bar chart and X-axis labels */}
                <div
                    className="flex items-end justify-around w-full"
                    style={{
                        position: 'absolute',
                        top: chartPaddingTop + negativeMarginTop + 'px', // Bars now start negativeMarginTop from the new padded top
                        left: '0',
                        right: '0',
                        height: chartInnerHeight + 'px',
                        paddingLeft: '48px',
                        paddingRight: '10px',
                    }}
                >
                    {data.map((value, index) => (
                        <div key={index} className="flex flex-col items-center justify-end mx-1">
                            <div
                                className="bg-white rounded-t-sm"
                                style={{
                                    height: `${(value / maxVal) * chartInnerHeight}px`,
                                    width: '10px', // Changed bar width to 10px
                                }}
                            ></div>
                        </div>
                    ))}
                </div>

                {/* X-axis labels (days) */}
                <div
                    className="flex justify-around w-full absolute"
                    style={{
                        bottom: chartPaddingBottom / 2 + 'px', // Adjust this value to bring labels closer to the bars
                        paddingLeft: '48px',
                        paddingRight: '10px',
                        zIndex: 3,
                    }}
                >
                    {days.map((day, index) => (
                        <span key={index} className="text-xs text-white mx-1">
                            {day}
                        </span>
                    ))}
                </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-800 mt-[0px]">My Assigned Safaris</h3>
            <p className="text-sm text-gray-600">Currently assigned safaris.</p>

            <p className="text-gray-500 text-xs mt-4 flex items-center">
                <MdAccessTime className="mr-1" /> updated 2 days ago
            </p>
        </div>
    );
};

// Component for the "Monthly Safari Assignments" line chart (reverted to SVG for accuracy)
const MonthlySafariAssignmentsChart: React.FC = () => {
    const data = [50, 80, 300, 320, 480, 200, 220, 500, 250, 450]; // Added a 10th data point for Dec
    const months = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const maxVal = 600;

    const chartInnerHeight = 150; // Same inner height as the bar chart
    const chartPaddingTop = 0; // Same padding top as the bar chart
    const chartPaddingBottom = 30; // Same padding bottom as the bar chart
    const negativeMarginTop = 48; // The absolute value of the negative margin

    // These values are based on the bar chart's layout for consistent appearance
    // Use a more responsive approach for svgWidth, typically based on parent's clientWidth
    const svgWidth = 500; // This will be overridden by w-full, but needed for internal calculations
    const svgHeight = chartInnerHeight + chartPaddingTop + chartPaddingBottom + negativeMarginTop; // Consistent with bar chart's total height
    const paddingLeft = 48; // Consistent with bar chart's paddingLeft for content
    const paddingRight = 10; // Consistent with bar chart's paddingRight for content

    const chartPlotWidth = svgWidth - paddingLeft - paddingRight; // The actual drawable width for the line/points
    const chartPlotHeight = chartInnerHeight; // The actual drawable area for the line/points

    const getPoints = () => {
        const points = data.map((value, index) => {
            const x = paddingLeft + (index / (data.length - 1)) * chartPlotWidth;
            // Y position for SVG: 0 is top, max is bottom.
            // We want 0 data value to be at chartPlotHeight (bottom of plot area)
            // and maxVal to be at 0 (top of plot area).
            // This 'y' is relative to the SVG's own coordinate system.
            const y = chartPlotHeight - (value / maxVal) * chartPlotHeight;
            return `${x},${y}`;
        }).join(' ');
        return points;
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col" style={{ height: 'fit-content' }}>
            {/* Chart div - moved to top with adjusted styles */}
            <div
                className="relative rounded-lg overflow-hidden flex flex-col mb-4"
                style={{
                    background: 'linear-gradient(213deg, #66BB6A 0%, #43A047 100%)', // Adjusted background color for this chart
                    boxShadow: '0px 7px 10px -5px #4CAF4F66, 0px 4px 20px 0px #00000024',
                    height: svgHeight,
                    marginTop: `-${negativeMarginTop}px`, // Move the entire chart container up
                }}
            >
                {/* Y-axis labels and horizontal grid lines */}
                {[0, 200, 400, 600].map((label, index) => (
                    <React.Fragment key={`y-axis-${label}`}>
                        <span
                            className="absolute text-white text-xs font-medium opacity-80"
                            style={{
                                left: '12px',
                                // Position labels from the top, aligning 0 with the bottom of the chart area
                                top: `${chartPaddingTop + chartInnerHeight - (label / maxVal) * chartInnerHeight - (label === 0 ? 0 : 4) + negativeMarginTop}px`, // Adjusted for new paddingTop and 0 alignment
                                transform: label === 0 ? 'translateY(0%)' : 'translateY(50%)', // No vertical transform for 0
                                zIndex: 2,
                            }}
                        >
                            {label}
                        </span>
                        {/* Only render grid lines for non-zero labels (or adjust if 0 line is desired) */}
                        {label !== 0 && (
                            <div
                                className="absolute left-0 right-0 bg-white opacity-20"
                                style={{
                                    // Position grid lines from the top, considering chartPaddingTop
                                    top: `${chartPaddingTop + chartInnerHeight - (label / maxVal) * chartInnerHeight + negativeMarginTop}px`,
                                    height: '1px',
                                    width: '100%',
                                    zIndex: 1,
                                }}
                            ></div>
                        )}
                        {label === 0 && (
                            <div
                                className="absolute left-0 right-0 bg-white opacity-40" // Slightly more opaque for the 0 line
                                style={{
                                    top: `${chartPaddingTop + chartInnerHeight + negativeMarginTop}px`,
                                    height: '1px',
                                    width: '100%',
                                    zIndex: 1,
                                }}
                            ></div>
                        )}
                    </React.Fragment>
                ))}

                <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full" style={{
                    position: 'absolute',
                    top: chartPaddingTop + negativeMarginTop + 'px', // SVG content now starts negativeMarginTop from the new padded top
                    left: '0',
                    right: '0',
                    height: chartInnerHeight + 'px',
                    overflow: 'visible', // Allow content to overflow if needed for points/lines
                }}>
                    {/* Line path */}
                    <polyline
                        fill="none"
                        stroke="#AEEA00"
                        strokeWidth="3"
                        points={getPoints()}
                    />

                    {/* Data points */}
                    {data.map((value, index) => {
                        const x = paddingLeft + (index / (data.length - 1)) * chartPlotWidth;
                        const y = chartPlotHeight - (value / maxVal) * chartPlotHeight;
                        return (
                            <circle key={index} cx={x} cy={y} r="4" fill="white" />
                        );
                    })}
                </svg>

                {/* X-axis labels (months) */}
                <div
                    className="flex justify-around w-full absolute"
                    style={{
                        bottom: chartPaddingBottom / 2 + 'px',
                        paddingLeft: paddingLeft + 'px',
                        paddingRight: paddingRight + 'px',
                        zIndex: 3,
                    }}
                >
                    {months.map((month, index) => {
                        const x = paddingLeft + (index / (months.length - 1)) * chartPlotWidth;
                        return (
                            <span
                                key={month}
                                className="text-xs text-white absolute"
                                style={{
                                    left: `${x}px`,
                                    transform: 'translateX(-50%)', // Center the text horizontally
                                }}
                            >
                                {month}
                            </span>
                        );
                    })}
                </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-800">Monthly Safari Assignments</h3>
            <p className="text-sm text-gray-600">Number of safaris booked per month</p>

            <p className="text-gray-500 text-xs mt-4 flex items-center">
                <MdAccessTime className="mr-1" /> updated 4 min ago
            </p>
        </div>
    );
};

// Component for Recent Bookings table
const RecentBookingsTable: React.FC = () => {
    const bookings = [
        { bookingId: 'BK-004', clientName: 'John Doe', tripStartDate: 'Aug 25, 2025', endDare: 'Sep 17, 2025', packageType: 'Luxury', status: 'ON-GOING' },
        { bookingId: 'BK-005', clientName: 'Jane Smith', tripStartDate: 'Aug 29, 2025', endDare: 'Oct 17, 2025', packageType: 'Luxury', status: 'PENDING' },
        { bookingId: 'BK-004', clientName: 'John Doe', tripStartDate: 'Aug 25, 2025', endDare: 'Sep 17, 2025', packageType: 'Luxury', status: 'ON-GOING' },
        { bookingId: 'BK-005', clientName: 'Jane Smith', tripStartDate: 'Aug 29, 2025', endDare: 'Oct 17, 2025', packageType: 'Luxury', status: 'PENDING' },
    ];

    const getStatusClasses = (status: string) => {
        switch (status) {
            case 'ON-GOING':
                return 'bg-blue-100 text-blue-800';
            case 'PENDING':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Bookings</h3>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Booking ID
                            </th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Client Name
                            </th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Trip Start Date
                            </th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                End Date
                            </th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Package Type
                            </th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Upload Document
                            </th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {bookings.map((booking, index) => (
                            <tr key={index}>
                                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.bookingId}</td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{booking.clientName}</td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{booking.tripStartDate}</td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{booking.endDare}</td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{booking.packageType}</td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-blue-600 cursor-pointer">
                                    {booking.status === 'ON-GOING' ? 'View Document' : 'Upload Document'}
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(booking.status)}`}>
                                        {booking.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// Component for Assigned Tasks
const AssignedTasks: React.FC = () => {
    const tasks = [
        { type: 'Booking confirmed', user: 'John Doe', time: '22 DEC 7:20 PM', status: 'success' },
        { type: '1st payment received', user: 'Jane Smith', time: '21 DEC 11:00 PM', status: 'payment' },
        { type: 'Safari assigned to guide', user: 'Sarah N.', time: '21 DEC 9:34 PM', status: 'assigned' },
        { type: 'Travel docs uploaded', user: 'Max Patel', time: '20 DEC 2:20 AM', status: 'document' },
        { type: 'Booking confirmed', user: 'John Doe', time: '22 DEC 7:20 PM', status: 'success' },
        { type: '1st payment received', user: 'Jane Smith', time: '21 DEC 11:00 PM', status: 'payment' },
        { type: 'Safari assigned to guide', user: 'Sarah N.', time: '21 DEC 9:34 PM', status: 'assigned' },
        { type: 'Travel docs uploaded', user: 'Max Patel', time: '20 DEC 2:20 AM', status: 'document' },
    ];

    const getStatusIconAndColor = (status: string) => {
        switch (status) {
            case 'success':
                return { IconComponent: MdCheckCircle, bgColor: 'bg-green-500' };
            case 'payment':
                return { IconComponent: MdAccountBalanceWallet, bgColor: 'bg-red-500' };
            case 'assigned':
                return { IconComponent: MdPerson, bgColor: 'bg-blue-500' };
            case 'document':
                return { IconComponent: MdDescription, bgColor: 'bg-orange-500' };
            default:
                return { IconComponent: MdCheckCircle, bgColor: 'bg-gray-500' };
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Assigned Tasks</h3>
            <p className="text-sm text-gray-600 mb-4">Updated activity feed from your safaris</p>
            <div className="space-y-4">
                {tasks.map((task, index) => {
                    const { IconComponent, bgColor } = getStatusIconAndColor(task.status);
                    return (
                        <div key={index} className="flex items-start">
                            {/* White icon on colored circle background */}
                            <div className={`w-8 h-8 flex items-center justify-center rounded-full mr-3 ${bgColor}`}>
                                <IconComponent className="text-white text-xl" /> {/* Icon is white and size text-xl inside the circle */}
                            </div>
                            <div className="flex-1">
                                <p className="text-gray-800 font-medium">{task.type} - {task.user}</p>
                                <p className="text-gray-500 text-sm">{task.time}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// DashboardCard component (moved inside Dashboard to ensure it has access to DashboardCardProps)
const DashboardCard: React.FC<DashboardCardProps> = ({
    icon: Icon,
    iconBgColor,
    title,
    value,
    changePercentage,
    changeType,
}) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col justify-between min-w-[200px] flex-1">
            <div className="flex items-start mb-4 justify-between w-full">
                {/* Icon on the left */}
                <div className={`p-3 rounded-lg ${iconBgColor} text-white mr-4`}>
                    <Icon className="w-6 h-6" />
                </div>

                {/* Title above Value, both left-aligned */}
                <div className="flex flex-col items-end">
                    <p className="text-[#2A374C] text-[16px] font-medium font-roboto">
                        {title}
                    </p>
                    <h2 className="text-2xl font-bold text-gray-800 font-roboto">{value}</h2>
                </div>
            </div>

            {/* Change Percentage */}
            <p
                className={`text-sm font-medium ${
                    changeType === 'positive' ? 'text-green-500' : 'text-red-500'
                }`}
            >
                {changePercentage}{' '}
                <span className="text-[#7B809A] font-light text-[14px] leading-[21px] tracking-[0.4px] font-roboto">
                    than last week
                </span>
            </p>
        </div>
    );
};


function Dashboard() {
    const dashboardCardData: DashboardCardProps[] = [
        {
            icon: MdCalendarToday,
            iconBgColor: "bg-gray-800",
            title: "Upcoming Safaris (within the next 30 days)",
            value: 15,
            changePercentage: "+55%",
            changeType: "positive",
        },
        {
            icon: MdFlightTakeoff,
            iconBgColor: "bg-blue-500",
            title: "Currently Running Safaris",
            value: 8,
            changePercentage: "+55%",
            changeType: "positive",
        },
        {
            icon: MdAssignment,
            iconBgColor: "bg-green-500",
            title: "Tasks Assigned to Me",
            value: 2,
            changePercentage: "+55%",
            changeType: "positive",
        },
        {
            icon: MdAssignmentTurnedIn,
            iconBgColor: "bg-pink-500",
            title: "Tasks I've Assigned to Others",
            value: 12,
            changePercentage: "+55%",
            changeType: "positive",
        },
    ];

    return (
        <div className="min-h-screen font-sans  bg-[#F0F2F5] pY-4"> {/* Removed 'flex' and adjusted padding */}
            {/* The content container now fills the full width, removing the ml-[272px] */}
            <div className="flex flex-col"> {/* Removed ml-[272px] */}
                {/* Dashboard Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4"> {/* Added mb-4 for spacing */}
                    {dashboardCardData.map((card, index) => (
                        <DashboardCard key={index} {...card} />
                    ))}
                </div>

                {/* Main content grid: Adjusting for fit-content on the right column */}
                <div className="grid grid-cols-1 lg:grid-cols-[repeat(2,minmax(0,1fr))_fit-content] gap-4 mt-[25px]" > {/* Removed p-4 as outer div has it */}
                    {/* Left Column for Charts and Recent Bookings (spans the first two flexible columns) */}
                    <div className="lg:col-span-2 flex flex-col gap-4">
                        {/* Charts row - these will be side-by-side on md screens and above */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4" style={{ height: 'fit-content' }}>
                            <MyAssignedSafarisChart />
                            <MonthlySafariAssignmentsChart />
                        </div>
                        {/* Recent Bookings will appear below the charts within this column */}
                        <RecentBookingsTable />
                    </div>

                    {/* Right Column for Assigned Tasks (starts at the third, fit-content column) */}
                    <div className="lg:col-start-3">
                        <AssignedTasks />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;