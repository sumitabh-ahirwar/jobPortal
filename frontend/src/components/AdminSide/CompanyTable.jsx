import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge, Edit, Edit2, MoreHorizontal, MoreVertical } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover } from "../ui/popover";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function CompanyTable() {
  const navigate = useNavigate();
  const { companies, searchCompanyByText } = useSelector(
    (state) => state.company,
  );
  const [filterCompany, setFilterCompany] = useState(companies);
  useEffect(() => {
    const filteredCompany =
      companies?.length >= 0 &&
      companies.filter((company) => {
        if (!searchCompanyByText) return true;
        return company?.name
          ?.toLowerCase()
          .includes(searchCompanyByText.toLowerCase());
      });
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);
  return (
    <div>
      <div>
        <Table>
          <TableCaption>
            A list of your recent registered comapnies
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Logo</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className={"text-right"}>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filterCompany?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-4">
                  You haven't registered any company yet.
                </TableCell>
              </TableRow>
            ) : (
              <>
                {filterCompany?.map((company, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Avatar>
                        <AvatarImage src={company?.logo} />
                      </Avatar>
                    </TableCell>
                    <TableCell>{company?.name}</TableCell>
                    <TableCell>{company?.createdAt?.split("T")?.[0]}</TableCell>
                    <TableCell className="text-right cursor-pointer relative">
                      <Popover>
                        <PopoverTrigger asChild>
                          <div className="inline-flex justify-end w-full">
                            <MoreHorizontal className="" />
                          </div>
                        </PopoverTrigger>

                        <PopoverContent
                          align="end"
                          side="right"
                          sideOffset={15}
                          alignOffset={-15}
                          className="w-24 p-2"
                        >
                          <div
                            onClick={() =>  navigate(`/admin/companies/update/${company?._id}`)}
                            className="flex items-center gap-2 cursor-pointer rounded-sm hover:bg-gray-100"
                          >
                            <Edit2 className="w-4" />
                            <span>Edit</span>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                  </TableRow>
                ))}
              </>
            )}
            {}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default CompanyTable;
