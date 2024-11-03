"use server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const addUsertoDb = async (userDetails) => {
  const { regUsername, regEmail, hashedPassword } = userDetails;

  try {
    const newuser = await prisma.users.create({
      data: {
        email: regEmail,
        userName: regUsername,
        password: hashedPassword,
      },
    });
    return newuser;
  } catch (error) {
    throw new Error(error);
  }
};

export const addPermissiontoDb = async (permission) => {
  try {
    const newPermission = await prisma.userPermissions.create({
      data: { name: permission },
    });
    return newPermission;
  } catch (error) {
    throw new Error(error);
  }
};

export const getPermissions = async () => {
  try {
    const allPermissions = await prisma.userPermissions.findMany();
    return allPermissions;
  } catch (error) {
    throw new Error(error);
  }
};

export const changePasswordbyId = async ({ id, password }) => {
  try {
    const updatedUser = await prisma.users.update({
      where: { id: parseInt(id) },
      data: {
        password,
      },
    });
    return updatedUser;
  } catch (error) {
    throw new Error(error);
  }
};

export const updatePermissionsbyId = async ({ id, permissions }) => {
  try {
    const updatedUser = await prisma.users.update({
      where: { id: parseInt(id) },
      data: {
        permissions: {
          set: permissions.map((id) => ({ id })),
        },
      },
    });
    return updatedUser;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteUserbyId = async ({ id }) => {
  try {
    const deleteUser = await prisma.users.delete({
      where: { id: parseInt(id) },
    });
    return deleteUser;
  } catch (error) {
    throw new Error(error);
  }
};
