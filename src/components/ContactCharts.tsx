import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { useRef } from "react";

const emailData = [
  { month: "Jan", sent: 12400, opened: 4800, clicked: 1200 },
  { month: "Feb", sent: 15200, opened: 6100, clicked: 1800 },
  { month: "Mar", sent: 18100, opened: 7200, clicked: 2100 },
  { month: "Apr", sent: 14300, opened: 5500, clicked: 1500 },
  { month: "May", sent: 19800, opened: 8100, clicked: 2900 },
  { month: "Jun", sent: 22100, opened: 9400, clicked: 3200 },
];

const whatsappData = [
  { month: "Jan", sent: 3200, delivered: 3100, read: 2800 },
  { month: "Feb", sent: 4100, delivered: 3900, read: 3400 },
  { month: "Mar", sent: 5500, delivered: 5200, read: 4600 },
  { month: "Apr", sent: 4800, delivered: 4500, read: 3900 },
  { month: "May", sent: 6200, delivered: 5900, read: 5100 },
  { month: "Jun", sent: 7100, delivered: 6800, read: 6000 },
];

const smsData = [
  { month: "Jan", sent: 8900, delivered: 8700, replied: 420 },
  { month: "Feb", sent: 9200, delivered: 9000, replied: 510 },
  { month: "Mar", sent: 11400, delivered: 11100, replied: 680 },
  { month: "Apr", sent: 10200, delivered: 9900, replied: 590 },
  { month: "May", sent: 13100, delivered: 12800, replied: 810 },
  { month: "Jun", sent: 14500, delivered: 14100, replied: 920 },
];

const KPI = ({ label, value }: { label: string; value: string }) => (
  <div className="border border-border bg-background p-4">
    <p className="font-mono-ui text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
    <p className="font-mono-ui text-2xl font-bold text-primary mt-1">{value}</p>
  </div>
);

const chartColors = {
  navy: "hsl(213, 100%, 22%)",
  navyMid: "hsl(213, 80%, 35%)",
  orange: "hsl(22, 100%, 50%)",
  orangeDark: "hsl(22, 80%, 40%)",
};

const ContactCharts = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="border border-border bg-card h-full flex flex-col">
      <div className="px-5 py-4 border-b border-border">
        <h2 className="font-mono-ui text-xs font-semibold uppercase tracking-widest text-primary">
          Power BI — Contact Performance
        </h2>
        <p className="font-body text-xs text-muted-foreground mt-1">
          Scroll horizontally to view E-mail → WhatsApp → SMS
        </p>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 overflow-x-auto overflow-y-hidden scrollbar-thin"
      >
        <div className="flex h-full min-w-max">
          {/* EMAIL BAY */}
          <div className="w-[480px] shrink-0 border-r border-border p-5 flex flex-col gap-4">
            <h3 className="font-mono-ui text-xs uppercase tracking-widest text-foreground">
              E-mail
            </h3>
            <div className="grid grid-cols-3 gap-2">
              <KPI label="Sent" value="101.9K" />
              <KPI label="Open Rate" value="38.2%" />
              <KPI label="CTR" value="12.7%" />
            </div>
            <div className="flex-1 min-h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={emailData}>
                  <CartesianGrid stroke="hsl(213, 13%, 28%)" strokeDasharray="3 3" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(216, 12%, 84%)" }} />
                  <YAxis tick={{ fontSize: 11, fill: "hsl(216, 12%, 84%)" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(216, 16%, 12%)",
                      border: "1px solid hsl(213, 13%, 28%)",
                      fontFamily: "Roboto Mono",
                      fontSize: 12,
                    }}
                  />
                  <Bar dataKey="sent" fill={chartColors.navy} />
                  <Bar dataKey="opened" fill={chartColors.navyMid} />
                  <Bar dataKey="clicked" fill={chartColors.orange} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* WHATSAPP BAY */}
          <div className="w-[480px] shrink-0 border-r border-border p-5 flex flex-col gap-4">
            <h3 className="font-mono-ui text-xs uppercase tracking-widest text-foreground">
              WhatsApp
            </h3>
            <div className="grid grid-cols-3 gap-2">
              <KPI label="Sent" value="30.9K" />
              <KPI label="Delivery" value="95.1%" />
              <KPI label="Read Rate" value="86.4%" />
            </div>
            <div className="flex-1 min-h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={whatsappData}>
                  <CartesianGrid stroke="hsl(213, 13%, 28%)" strokeDasharray="3 3" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(216, 12%, 84%)" }} />
                  <YAxis tick={{ fontSize: 11, fill: "hsl(216, 12%, 84%)" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(216, 16%, 12%)",
                      border: "1px solid hsl(213, 13%, 28%)",
                      fontFamily: "Roboto Mono",
                      fontSize: 12,
                    }}
                  />
                  <Line type="monotone" dataKey="sent" stroke={chartColors.navy} strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="delivered" stroke={chartColors.navyMid} strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="read" stroke={chartColors.orange} strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* SMS BAY */}
          <div className="w-[480px] shrink-0 p-5 flex flex-col gap-4">
            <h3 className="font-mono-ui text-xs uppercase tracking-widest text-foreground">
              SMS
            </h3>
            <div className="grid grid-cols-3 gap-2">
              <KPI label="Sent" value="67.3K" />
              <KPI label="Delivery" value="97.4%" />
              <KPI label="Reply Rate" value="5.8%" />
            </div>
            <div className="flex-1 min-h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={smsData}>
                  <CartesianGrid stroke="hsl(213, 13%, 28%)" strokeDasharray="3 3" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(216, 12%, 84%)" }} />
                  <YAxis tick={{ fontSize: 11, fill: "hsl(216, 12%, 84%)" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(216, 16%, 12%)",
                      border: "1px solid hsl(213, 13%, 28%)",
                      fontFamily: "Roboto Mono",
                      fontSize: 12,
                    }}
                  />
                  <Bar dataKey="sent" fill={chartColors.orange} />
                  <Bar dataKey="delivered" fill={chartColors.midOrange} />
                  <Bar dataKey="replied" fill={chartColors.red} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactCharts;
