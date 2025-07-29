import DashboardWrapper from "@/components/modules/dashboardWrapper";
import { Header } from "@/components/modules/header";
import { Sidebar } from "@/components/modules/sidebar";

type Props = {
  children: Readonly<React.ReactNode>;
};

// -------------------------------

export default function DashboardLayout(props: Props) {
  return (
    <DashboardWrapper>
      <div dir="rtl" className="">
        <Header />
        <div className="mx-auto max-w-[1280px] px-6 pt-10 pb-20 transition-all xl:px-0">
          <div className="pr-72">{props.children}</div>
          <Sidebar />
        </div>
      </div>
    </DashboardWrapper>
  );
}
