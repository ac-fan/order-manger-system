package com.qst.service.role;

import com.qst.dao.BaseDao;
import com.qst.dao.role.RoleDao;
import com.qst.dao.role.RoleDaoImpl;
import com.qst.pojo.Role;

import java.sql.Connection;
import java.util.List;


public class RoleServiceImpl implements RoleService {

    private final RoleDao roleDao;

    public RoleServiceImpl() {
        roleDao = new RoleDaoImpl();
    }

    @Override
    public List<Role> getRoleList() {
        Connection connection = null;
        List<Role> roleList = null;
        try {
            connection = BaseDao.getConnection();
            roleList = roleDao.getRoleList(connection);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            BaseDao.closeResource(connection, null, null);
        }
        return roleList;
    }

}